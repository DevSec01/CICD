# CI/CD Security Lab
 
A deliberately vulnerable GitHub Actions pipeline for practicing pipeline
identity hardening and supply chain integrity fixes.
 
## Vulnerabilities baked into `.github/workflows/ci.yml`
 
1. **Unpinned third-party actions** — `actions/checkout@v3` and
   `actions/setup-node@v3` are pinned to mutable tags, not commit SHAs.
2. **Long-lived static cloud credentials** — AWS keys stored as repo
   secrets and exported directly, instead of short-lived OIDC-federated
   credentials.
3. **Overly broad `GITHUB_TOKEN` permissions** — no `permissions:` block,
   so the token defaults to broad access.
4. **`pull_request_target` + untrusted checkout + script injection** —
   the workflow checks out fork PR code and runs it with base-repo
   secrets/permissions, and separately interpolates the untrusted PR
   title directly into a shell command.
5. **No branch protection on workflow files** — nothing stops a
   contributor (or a merged malicious PR) from editing the pipeline's
   own logic and permissions.
We'll fix these one at a time and verify each fix with a real Actions run.
 