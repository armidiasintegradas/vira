# @ar-platform/sdk
## SDKs Oficiais Multi-Linguagem • AR Mídias Integradas

Bibliotecas cliente oficiais para integração de sistemas externos, ERPs de obras, softwares de modelagem BIM (Revit/ArchiCAD) e análises de dados com a plataforma **AR OS**.

---

## JavaScript / TypeScript
```javascript
import { createArClient } from '@ar-platform/sdk';

const client = createArClient({
  apiKey: 'sua_chave_api',
  tenant: 'prefeitura-caruaru',
  brand: 'vira'
});

// Lista materiais homologados
const { data: materials } = await client.materials.list();

// Valida Passaporte Digital de Produto (DPP)
const { data: dpp } = await client.dpp.verify('LOTE-2026-VR09');
console.log('Lote auditado:', dpp.fckMpa, 'MPa');
```

---

## Python
```python
from ar_platform_sdk import create_ar_client

client = create_ar_client(
    api_key="sua_chave_api",
    tenant="prefeitura-caruaru",
    brand="vira"
)

materials = client.list_materials()
print(materials["data"])
```
