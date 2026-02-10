"""Privacy Service - GDPR compliance"""
import hashlib

class PrivacyService:
    def __init__(self):
        self.consents = {}
    
    def hash_identifier(self, identifier):
        return hashlib.sha256(f"uniroute:{identifier}".encode()).hexdigest()[:32]
    
    def record_consent(self, user_hash, consent_type, granted):
        if user_hash not in self.consents: self.consents[user_hash] = {}
        self.consents[user_hash][consent_type] = granted
        return True
    
    def get_consents(self, user_hash):
        return self.consents.get(user_hash, {})
    
    def delete_data(self, user_hash):
        if user_hash in self.consents: del self.consents[user_hash]
        return True

privacy_service = PrivacyService()
