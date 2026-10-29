# OCI Tenancy Atlas

A single-page, no-build playground for learning Oracle Cloud Infrastructure layout: tenancies, compartments, VCNs, subnets, DRGs, policies and spend. Design something, see it as a diagram, get a review, and export Terraform.

Open `index.html` in a browser, or serve the folder with any static server.

## Download a single-file build

Every push to `main` builds `index.html` with the vendored renderer inlined and force-pushes it to the `dist` branch. Download it from the `dist` branch on GitHub (Code → Download ZIP), or build it yourself with `node scripts/build.mjs`, which writes `dist/index.html`.

The built file works offline. It only reaches the network for Google Fonts (falls back to system fonts) and Mermaid from jsDelivr, which is used only when you pick a Mermaid renderer in the Diagram tab.

## What's inside

| Tab | What it does |
|---|---|
| Build | Outline of tenancies → compartments → VCNs → subnets → resources, with an inspector that explains each node and shows inherited policies |
| Diagram | Logical (compartments) and physical (regions) views, rendered by vendored [ondine](https://github.com/wevm/ondine), with Mermaid flowchart and architecture fallbacks |
| Review | Architecture linter (CIDR overlaps, public databases, policy scope, region subscriptions, compartment depth) and FinOps rollups against budgets and Always Free limits |
| Terraform | `main.tf` for the whole design using the `oracle/oci` provider; **Generate policies** writes least-privilege IAM policies from the design |
| Missions | Scored design goals |
| Learn, Tradeoffs, Rosetta | Concepts, design tradeoffs (registries, shared services, replication, hub firewall models, landing-zone shapes), and an OCI ↔ AWS/GCP/Azure/OpenShift mapping |
| Links | Curated OCI docs and repos, plus an A–Z directory of terms |

## Templates

Solo hacker on Always Free · two tenancies with Endorse/Admit · small team · startup with DR · enterprise organization · Core Landing Zone (Hub B) · two-firewall hub (Hub A) · lean hub (Hub E) · operating entities · SaaS pod · SaaS multi-tenant · Zero Trust · SCCA-style mission owner.

Templates follow Oracle's [landing zone blueprints](https://docs.oracle.com/en-us/iaas/Content/cloud-adoption-framework/oci-landing-zones-overview.htm) and the [Operating Entities hub models](https://github.com/oci-landing-zones/oci-landing-zone-operating-entities).

## Caveats

- Prices are rough monthly list prices for teaching, not quotes.
- Generated Terraform is a starting point: it passed structural checks (references, variables, providers) but has not been run through `terraform validate`. Run `terraform init && terraform validate && terraform plan` before applying.
- Always Free figures reflect the June 2026 change (Ampere A1: 2 OCPU / 12 GB).

## Vendored code

`vendor/ondine-0.0.3.js` contains ondine 0.0.3 (MIT, © the ondine authors): its WebAssembly loader and renderer, unmodified apart from module wrapping, plus only the `architecture` and `flowchart` compiler modules. The license text is in the file header. Mermaid 11.16.1 loads from jsDelivr.
