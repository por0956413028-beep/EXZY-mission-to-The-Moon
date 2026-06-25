# Figma Reference

Figma file:
https://www.figma.com/design/od7fh8S0W00SSgdQJ7Snyx/Dashboard?node-id=0-1&t=Un4QZHSmXwvrwnzF-1

## Role Of Figma

Figma is the design source of truth for future dashboard revisions.

This local project keeps a lightweight Markdown translation of the dashboard structure so design and implementation decisions can be reviewed without spending too much context on the full HTML.

## API Connection

This project can connect to Figma through the REST API using a personal access token.

Security rule:

- Never commit the real token.
- Store the real token only in `.env.local`.
- `.env.local` is ignored by Git.
- If a token is posted in chat, revoke it and create a new one.

Setup:

```powershell
Copy-Item .env.example .env.local
```

Then edit `.env.local`:

```env
FIGMA_TOKEN=your_new_token_here
FIGMA_FILE_KEY=od7fh8S0W00SSgdQJ7Snyx
FIGMA_NODE_ID=0:1
```

Fetch Figma JSON:

```powershell
node scripts/fetch-figma.mjs
node scripts/figma-to-spec.mjs
```

Output goes to `figma-cache/`, which is ignored by Git.

## Current Limitation

The REST API is good for reading Figma structure and exporting references. It does not directly edit the Figma canvas. Direct design editing still happens in Figma, while implementation edits happen in this repo after approval.

## Future Figma Workflow

Recommended workflow:

1. User updates or comments in Figma.
2. User sends a screenshot, exported frame, or clear design instruction.
3. Codex audits `DASHBOARD_SPEC.md`, `index.html`, and the Figma reference.
4. Codex proposes a Markdown change plan.
5. User approves.
6. Codex implements the approved HTML/CSS/JS changes.

## Approval Checklist

Before implementation, confirm:

- Which Figma frame or section is affected.
- Which dashboard section changes.
- Whether the change affects data logic or only visual layout.
- Whether portrait, cast rotate mode, or both need verification.
- Whether GitHub commit/push is required after the change.
