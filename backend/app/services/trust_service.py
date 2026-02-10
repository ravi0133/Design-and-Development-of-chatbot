"""Trust Service - Confidence scoring"""
class TrustService:
    DISCLAIMERS = {
        'visa': "⚠️ Visa requirements change frequently. Verify with official sources.",
        'university': "⚠️ Based on historical data. Contact universities for current requirements.",
        'financial': "⚠️ Costs are estimates. Check institutions for current pricing.",
        'general': "⚠️ AI-generated guidance. Please verify important information."
    }
    
    def calculate_confidence(self, search_results, query):
        if not search_results:
            return {'score': 0, 'level': 'very_low', 'icon': '🔴', 'explanation': 'No data found', 'data_points': 0}
        n = len(search_results)
        sims = [1/(1+d) for _,d in search_results]
        score = round(min(sum(sims)/len(sims)*0.7 + min(n/10,1)*0.3, 1), 2)
        if score >= 0.7: level, icon = 'high', '🟢'
        elif score >= 0.4: level, icon = 'medium', '🟡'
        elif score >= 0.2: level, icon = 'low', '🟠'
        else: level, icon = 'very_low', '🔴'
        return {'score': score, 'level': level, 'icon': icon, 'explanation': f'Based on {n} data points', 'data_points': n}
    
    def detect_query_type(self, query):
        q = query.lower()
        if any(w in q for w in ['visa','document','requirement']): return 'visa'
        if any(w in q for w in ['cost','fee','tuition']): return 'financial'
        if any(w in q for w in ['university','college','admit']): return 'university'
        return 'general'
    
    def get_disclaimer(self, query_type):
        return self.DISCLAIMERS.get(query_type, self.DISCLAIMERS['general'])

trust_service = TrustService()
