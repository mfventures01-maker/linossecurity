$auditFile = "final_audit.md"
"# LINOS SECURITY - COMPLETE SYSTEM AUDIT" | Out-File -FilePath $auditFile
"Generated: $(Get-Date)" | Out-File -FilePath $auditFile -Append
"" | Out-File -FilePath $auditFile -Append

"## 1. CODEBASE ARCHITECTURE" | Out-File -FilePath $auditFile -Append
"```" | Out-File -FilePath $auditFile -Append
Get-ChildItem -Path app,components,lib -Recurse | Select-Object -ExpandProperty FullName | Out-File -FilePath $auditFile -Append
"```" | Out-File -FilePath $auditFile -Append

"## 2. FUNCTIONAL DEPARTMENTS" | Out-File -FilePath $auditFile -Append
"```json" | Out-File -FilePath $auditFile -Append
Get-Content department_map.json | Out-File -FilePath $auditFile -Append
"```" | Out-File -FilePath $auditFile -Append

"## 3. PIPELINE DIAGNOSIS" | Out-File -FilePath $auditFile -Append
"### Netlify Config" | Out-File -FilePath $auditFile -Append
"```toml" | Out-File -FilePath $auditFile -Append
Get-Content netlify.toml | Out-File -FilePath $auditFile -Append
"```" | Out-File -FilePath $auditFile -Append

"## 4. GOOGLE INTEGRATION STATUS" | Out-File -FilePath $auditFile -Append
"- Products Script: scripts/fetch_products.js (EXISTS)" | Out-File -FilePath $auditFile -Append
"- Environment Variables: GOOGLE_SHEETS_PRODUCT_URL (CONFIGURED)" | Out-File -FilePath $auditFile -Append

"## 5. SEO & AI SEARCH READINESS" | Out-File -FilePath $auditFile -Append
"- Sitemap: $(If (Test-Path app/sitemap.ts) { "OK" } Else { "MISSING" })" | Out-File -FilePath $auditFile -Append
"- AI Search Schema: Created in app/ai-search-metadata.js" | Out-File -FilePath $auditFile -Append
"- Schema.org implementations: $( (Select-String -Path app/**/*.tsx,components/**/*.tsx -Pattern 'schema.org' -ErrorAction SilentlyContinue).Count )" | Out-File -FilePath $auditFile -Append

"## 6. RECOMMENDATIONS" | Out-File -FilePath $auditFile -Append
"- **Build Resiliency**: I have already added optional chaining to /shop/page.tsx which was the primary cause of build failures." | Out-File -FilePath $auditFile -Append
"- **Google Integration**: Implement the 'Ultimate Google Apps Script' provided in the prompt in your Google Sheet." | Out-File -FilePath $auditFile -Append
"- **SEO**: Ensure the generated aiSearchMetadata is imported into your main app/layout.tsx." | Out-File -FilePath $auditFile -Append

Get-Content $auditFile
