"""Rate Limiter Middleware"""
import time
from collections import defaultdict
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class RateLimiter(BaseHTTPMiddleware):
    def __init__(self, app, requests_per_minute=60, chat_requests_per_minute=20):
        super().__init__(app)
        self.rpm = requests_per_minute
        self.chat_rpm = chat_requests_per_minute
        self.requests = defaultdict(list)
    
    async def dispatch(self, request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        self.requests[client_ip] = [t for t in self.requests[client_ip] if now - t < 60]
        limit = self.chat_rpm if "/api/chat" in str(request.url) else self.rpm
        if len(self.requests[client_ip]) >= limit:
            return JSONResponse(status_code=429, content={"detail": "Rate limit exceeded"})
        self.requests[client_ip].append(now)
        return await call_next(request)
