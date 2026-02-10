"""Privacy Routes"""
from fastapi import APIRouter, Request
from pydantic import BaseModel
from app.services.privacy_service import privacy_service

router = APIRouter()

class ConsentRequest(BaseModel):
    consent_type: str
    granted: bool

@router.post("/privacy/consent")
async def record_consent(request: Request, req: ConsentRequest):
    ip = request.client.host if request.client else "unknown"
    h = privacy_service.hash_identifier(ip)
    privacy_service.record_consent(h, req.consent_type, req.granted)
    return {"status": "success"}

@router.get("/privacy/consent")
async def get_consents(request: Request):
    ip = request.client.host if request.client else "unknown"
    return {"consents": privacy_service.get_consents(privacy_service.hash_identifier(ip))}

@router.delete("/privacy/data")
async def delete_data(request: Request):
    ip = request.client.host if request.client else "unknown"
    privacy_service.delete_data(privacy_service.hash_identifier(ip))
    return {"status": "deleted"}

@router.get("/privacy/policy")
async def get_policy():
    return {"gdpr_compliant": True, "data_retention": "30 days"}
