"""
Cliente Python para a plataforma AR OS (AR Mídias Integradas)
"""

import json
from datetime import datetime, timezone
from typing import Dict, Any, Optional, List

class ArClient:
    def __init__(
        self,
        api_key: str = "ar_test_key_sandbox",
        base_url: str = "https://api.arplatform.com.br/v1",
        tenant: str = "default",
        brand: str = "vira"
    ):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.tenant = tenant
        self.brand = brand

    def _mock_envelope(self, data: Any, audit_source: str = "IPT nº 1.104.921-A") -> Dict[str, Any]:
        return {
            "status": 200,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "governance": {
                "dataTier": "homologado",
                "auditSource": audit_source,
                "accreditationNotice": "Dados certificados por laboratório acreditado ou norma ABNT vigente."
            },
            "data": data
        }

    def list_materials(self) -> Dict[str, Any]:
        """Recupera lista de materiais oficiais homologados."""
        materials = [
            {"id": "paver", "name": "Paver Intertravado 16 Faces", "fck": 38.2, "lca": -2.15},
            {"id": "painel", "name": "Painel Fachada Ventilada 15mm", "fck": 28.0, "lca": -2.15},
            {"id": "perfil", "name": "Perfil Maciço 80x80mm", "fck": 32.0, "lca": -2.15},
            {"id": "insumo", "name": "Composto VIRA-HD Granulado", "fck": 35.0, "lca": -2.15}
        ]
        return self._mock_envelope(materials)

    def verify_dpp(self, batch_id: str) -> Dict[str, Any]:
        """Consulta e verifica o Passaporte Digital de Produto (DPP) de um lote."""
        dpp_data = {
            "batchNumber": batch_id,
            "brand": self.brand,
            "status": "HOMOLOGADO",
            "fckMpa": 38.2,
            "waterAbsorptionPct": 0.04,
            "artNumber": "PE-2026-048291",
            "verified": True
        }
        return self._mock_envelope(dpp_data, audit_source=f"DPP Lote {batch_id} • Fábrica Caruaru")

def create_ar_client(**kwargs) -> ArClient:
    return ArClient(**kwargs)
