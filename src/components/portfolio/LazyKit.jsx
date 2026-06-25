import React from 'react';
import './lazykit.css';

const LazyKit = () => {
    return (
        <div className="lk_container">

            {/* ── Hero ── */}
            <div className="lk_hero">
                <span className="lk_emoji">🦥</span>
                <h1 className="lk_title">LazyKit</h1>
                <p className="lk_tagline">Drop an issue, get a PR.</p>
                <p className="lk_description">
                    LazyKit wires Claude AI directly into your GitHub repo. Open an issue from your phone, your
                    tablet, or anywhere — Claude reads it, writes the code, and opens a pull request entirely in
                    the cloud.{' '}
                    <strong>No laptop. No terminal. No IDE. Nothing running on your machine.</strong>
                    <br /><br />
                    You describe what you want. Claude ships it.
                </p>
                <div className="lk_hero_actions">
                    <a href="https://www.npmjs.com/package/@slahon/lazykit" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">npm</a>
                    <a href="https://github.com/lahonsourav/lazykit" className="lk_btn lk_btn_secondary" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>

            {/* ── Quickstart ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Quickstart</h2>
                <div className="lk_code_block">
                    <code>npx @slahon/lazykit@latest init</code>
                </div>
                <p className="lk_note">
                    Run this from your <strong>project's root directory</strong> — the same folder that contains your <code className="lk_inline_code">.git</code> folder and has a GitHub remote configured. That's it. LazyKit handles everything else automatically.
                </p>
            </div>

            {/* ── Requirements ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Requirements</h2>
                <ul className="lk_req_list">
                    <li><span className="lk_req_icon">✓</span><span>Node.js 18+</span></li>
                    <li>
                        <span className="lk_req_icon">✓</span>
                        <span>A GitHub repository with a remote set up — <code className="lk_inline_code">git remote -v</code> should show a GitHub URL</span>
                    </li>
                    <li>
                        <span className="lk_req_icon">✓</span>
                        <span>A Claude Pro or Max subscription — <a href="https://claude.ai" target="_blank" rel="noreferrer" className="lk_link">claude.ai</a></span>
                    </li>
                    <li>
                        <span className="lk_req_icon">✓</span>
                        <span><strong>Claude Code CLI</strong> — <code className="lk_inline_code">npm install -g @anthropic-ai/claude-code</code></span>
                    </li>
                    <li>
                        <span className="lk_req_icon">✓</span>
                        <span>
                            <strong>GitHub CLI (<code className="lk_inline_code">gh</code>)</strong> — <code className="lk_inline_code">brew install gh</code> or{' '}
                            <a href="https://cli.github.com" target="_blank" rel="noreferrer" className="lk_link">cli.github.com</a>, then <code className="lk_inline_code">gh auth login</code>
                        </span>
                    </li>
                    <li>
                        <span className="lk_req_icon">✓</span>
                        <span>
                            <strong>Claude Code GitHub App</strong> installed on your repo —{' '}
                            <a href="https://github.com/apps/claude" target="_blank" rel="noreferrer" className="lk_link">github.com/apps/claude</a>
                            <span className="lk_req_tag">required for the Actions workflow to run</span>
                        </span>
                    </li>
                </ul>
                <div className="lk_callout" style={{ marginTop: '1.25rem' }}>
                    <span className="lk_callout_icon">📁</span>
                    <span>
                        <strong>All <code className="lk_inline_code">npx @slahon/lazykit</code> commands must be run from your project's root directory</strong> — the folder where your <code className="lk_inline_code">.git</code> directory lives and your GitHub remote is configured.
                    </span>
                </div>
                <div className="lk_callout" style={{ marginTop: '0.75rem' }}>
                    <span className="lk_callout_icon">💡</span>
                    <span>
                        <code className="lk_inline_code">init</code> checks for <code className="lk_inline_code">gh</code> and <code className="lk_inline_code">claude</code> before proceeding. If either is missing or not authenticated, it will show you exactly what to install and wait for you to confirm before continuing — no need to restart.
                    </span>
                </div>
            </div>

            {/* ── How it works ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">How it works</h2>
                <div className="lk_steps">
                    <div className="lk_step">
                        <span className="lk_step_num">1</span>
                        <div>
                            <h3>Open an issue using the LazyKit Task template</h3>
                            <p>
                                Go to your repo on GitHub → <strong>Issues → New issue</strong>. You'll see a <strong>"LazyKit Task"</strong> option — click it to get a pre-filled form. Describe what you want Claude to build, then submit. The <code className="lk_inline_code">lazykit</code> label is applied automatically by the template, so you don't need to do anything else.
                            </p>
                        </div>
                    </div>
                    <div className="lk_step">
                        <span className="lk_step_num">2</span>
                        <div>
                            <h3>GitHub Actions kicks in</h3>
                            <p>
                                The moment the issue is submitted, GitHub detects the <code className="lk_inline_code">lazykit</code> label and triggers a workflow run. Go to your repo → <strong>Actions tab → "Claude Issue-to-PR" workflow</strong>. You'll see the run appear within seconds. Click into it to follow along in real time — Claude's output streams directly into the Actions log.
                            </p>
                        </div>
                    </div>
                    <div className="lk_step">
                        <span className="lk_step_num">3</span>
                        <div>
                            <h3>Claude reads, thinks, and writes</h3>
                            <p>Inside the Actions runner, Claude:</p>
                            <ul className="lk_bullet_list">
                                <li>Reads your issue title and description</li>
                                <li>Explores your codebase (guided by <code className="lk_inline_code">CLAUDE.md</code> if you have one)</li>
                                <li>Writes the code changes</li>
                                <li>Commits them to a new branch</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lk_step">
                        <span className="lk_step_num">4</span>
                        <div>
                            <h3>A pull request appears</h3>
                            <p>
                                When Claude is done, it opens a pull request against your main branch with a title, description, and a summary of what it did. You'll get a GitHub notification just like a PR from a teammate.
                            </p>
                        </div>
                    </div>
                    <div className="lk_step">
                        <span className="lk_step_num">5</span>
                        <div>
                            <h3>You review and merge</h3>
                            <p>
                                Look over the diff, request changes in comments if needed (Claude can re-run via <code className="lk_inline_code">@claude</code>), then merge when you're happy.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="lk_callout">
                    <span className="lk_callout_icon">💬</span>
                    You can also mention <code className="lk_inline_code">@claude</code> in any issue comment to give follow-up instructions or re-trigger Claude mid-thread.
                </div>
            </div>

            {/* ── What init does ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">What <code className="lk_title_code">init</code> does</h2>
                <p className="lk_section_subtitle">
                    Running <code className="lk_inline_code">npx @slahon/lazykit@latest init</code> fully sets up your repo — no manual steps required.
                </p>
                <div className="lk_init_steps">
                    {[
                        ["Detects repo", "Reads your git remote to find your GitHub repo"],
                        ["Detects stack", "Auto-detects your tech stack from package.json, go.mod, Cargo.toml, etc."],
                        ["Creates workflow", ".github/workflows/lazykit.yml — the GitHub Actions automation"],
                        ["Creates issue template", ".github/ISSUE_TEMPLATE/lazykit.md — auto-applies the trigger label"],
                        ["Creates CLAUDE.md", "Project guide so Claude understands your codebase"],
                        ["Creates label", "Creates the trigger label on GitHub"],
                        ["Enables PR creation", "Grants Actions permission to open pull requests"],
                        ["Sets token", "Runs claude setup-token and stores it as CLAUDE_CODE_OAUTH_TOKEN in your repo secrets"],
                        ["GitHub App", "Prompts you to install the Claude Code GitHub App on your repo"],
                        ["Commits and pushes", "Commits all generated files and pushes to GitHub"],
                    ].map(([step, desc]) => (
                        <div className="lk_init_row" key={step}>
                            <span className="lk_init_step">{step}</span>
                            <span className="lk_init_desc">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Init options ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Init options</h2>
                <p className="lk_section_subtitle">During <code className="lk_inline_code">npx @slahon/lazykit@latest init</code> you will be asked:</p>
                <div className="lk_init_steps">
                    <div className="lk_init_row lk_init_header">
                        <span className="lk_init_step">Option</span>
                        <span className="lk_init_step lk_col_default">Default</span>
                        <span className="lk_init_step">Description</span>
                    </div>
                    {[
                        ["Auto-trigger", "Yes", "Trigger Claude on every new issue, or only when you apply the label"],
                        ["Generate CLAUDE.md", "Yes", "Create a project guide for Claude"],
                    ].map(([opt, def, desc]) => (
                        <div className="lk_init_row lk_init_three_col" key={opt}>
                            <span className="lk_init_step">{opt}</span>
                            <code className="lk_col_default lk_inline_code">{def}</code>
                            <span className="lk_init_desc">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Commands ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Commands</h2>
                <div className="lk_code_block lk_code_multiline">
                    <code>npx @slahon/lazykit@latest init      <span className="lk_comment"># Set up LazyKit in your repo</span></code>
                    <code>npx @slahon/lazykit@latest status    <span className="lk_comment"># Check if everything is wired up correctly</span></code>
                    <code>npx @slahon/lazykit@latest update    <span className="lk_comment"># Regenerate workflow and CLAUDE.md</span></code>
                    <code>npx @slahon/lazykit@latest remove    <span className="lk_comment"># Remove LazyKit from your repo</span></code>
                </div>

                <h3 className="lk_sub_section_title">Flags</h3>
                <div className="lk_code_block lk_code_multiline">
                    <code>npx @slahon/lazykit@latest init --dry-run    <span className="lk_comment"># Preview what would happen without writing files</span></code>
                    <code>npx @slahon/lazykit@latest update --dry-run  <span className="lk_comment"># Preview changes without applying them</span></code>
                </div>

                <h3 className="lk_sub_section_title">lazykit status</h3>
                <p className="lk_sub_desc">Runs a health check and reports:</p>
                <ul className="lk_checklist">
                    <li><span className="lk_check">✔</span> Workflow file present</li>
                    <li><span className="lk_check">✔</span> Issue template present</li>
                    <li><span className="lk_check">✔</span> CLAUDE.md present</li>
                    <li><span className="lk_check">✔</span> <code className="lk_inline_code">CLAUDE_CODE_OAUTH_TOKEN</code> secret exists (with age warning if over 6 months old)</li>
                    <li><span className="lk_check">✔</span> Trigger label exists on GitHub</li>
                    <li><span className="lk_check">✔</span> Actions PR creation permission is enabled</li>
                    <li><span className="lk_check">✔</span> Branch protection status on <code className="lk_inline_code">main</code></li>
                </ul>

                <h3 className="lk_sub_section_title">lazykit update</h3>
                <p className="lk_sub_desc">
                    Re-generates <code className="lk_inline_code">.github/workflows/lazykit.yml</code> (and optionally <code className="lk_inline_code">CLAUDE.md</code>) without re-doing the full setup. Useful when you want to pull in changes to the workflow template. Reads your existing label name and trigger mode from the current workflow file.
                </p>

                <h3 className="lk_sub_section_title">lazykit remove</h3>
                <p className="lk_sub_desc">Cleanly removes LazyKit from your repo:</p>
                <ul className="lk_checklist">
                    <li><span className="lk_check lk_check_red">✖</span> Deletes the workflow file, issue template, and optionally CLAUDE.md</li>
                    <li><span className="lk_check lk_check_red">✖</span> Deletes the trigger label from GitHub</li>
                    <li><span className="lk_check lk_check_red">✖</span> Deletes the <code className="lk_inline_code">CLAUDE_CODE_OAUTH_TOKEN</code> secret</li>
                    <li><span className="lk_check lk_check_red">✖</span> Commits and pushes the removals</li>
                </ul>
            </div>

            {/* ── Trigger modes ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Trigger modes</h2>
                <div className="lk_two_col">
                    <div className="lk_mode_card lk_mode_auto">
                        <span className="lk_mode_badge">Default</span>
                        <h3>⚡ Auto</h3>
                        <p>Claude fires the moment a new issue is opened. No label needed. Fastest path from idea to PR.</p>
                    </div>
                    <div className="lk_mode_card lk_mode_label">
                        <span className="lk_mode_badge lk_mode_badge_alt">Optional</span>
                        <h3>🏷️ Label-controlled</h3>
                        <p>Claude only runs when you apply the trigger label. Use this when you want to review issues before handing them to Claude.</p>
                    </div>
                </div>
            </div>

            {/* ── Authentication ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Authentication</h2>
                <p className="lk_section_subtitle">
                    LazyKit uses your Claude Pro/Max subscription via an OAuth token — <strong>no pay-per-token API billing.</strong>
                </p>
                <div className="lk_info_card">
                    <p>
                        During <code className="lk_inline_code">init</code>, LazyKit runs <code className="lk_inline_code">claude setup-token</code> and tries to capture the token automatically. On many systems a browser window opens, you approve access, and the token is stored as <code className="lk_inline_code">CLAUDE_CODE_OAUTH_TOKEN</code> in your repo secrets without any extra steps.
                    </p>
                    <p>
                        If the token can't be captured automatically (varies by system), LazyKit falls back and asks you to paste it:
                    </p>
                </div>
                <div className="lk_code_block lk_code_multiline" style={{ marginBottom: '1rem' }}>
                    <code><span className="lk_comment">⚠ Could not capture the token automatically.</span></code>
                    <code><span className="lk_comment">  If a browser opened, complete the auth and copy the token it shows.</span></code>
                    <code>&nbsp;</code>
                    <code>  Paste your token here (or press Enter to skip) ›</code>
                </div>
                <p className="lk_note" style={{ marginBottom: '1rem' }}>
                    Just paste the token from your terminal and LazyKit sets the secret for you. If you skip, you'll get step-by-step instructions to add it manually.
                </p>
                <div className="lk_callout lk_callout_warn">
                    <span className="lk_callout_icon">⚠️</span>
                    <span><strong>Token expiry:</strong> OAuth tokens can expire. Run <code className="lk_inline_code">lazykit status</code> to check the age of your token. If it's expired, re-run <code className="lk_inline_code">npx @slahon/lazykit@latest init</code> to generate and store a fresh one.</span>
                </div>
            </div>

            {/* ── CLAUDE.md ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">CLAUDE.md</h2>
                <div className="lk_info_card">
                    <p>
                        LazyKit creates a <code className="lk_inline_code">CLAUDE.md</code> file at your repo root. This is Claude's project guide — it tells Claude about your stack, coding conventions, and rules to follow.
                    </p>
                    <p>
                        Edit it to match your actual project for best results. The more context you give, the better Claude's output will be.
                    </p>
                </div>
            </div>

            {/* ── Branch protection ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Branch protection</h2>
                <div className="lk_callout lk_callout_warn">
                    <span className="lk_callout_icon">⚠️</span>
                    <span>
                        If your <code className="lk_inline_code">main</code> branch has protection rules enabled, Claude's pull requests will be opened but <strong>cannot be auto-merged</strong> — they will require manual review and approval. LazyKit detects this during <code className="lk_inline_code">init</code> and <code className="lk_inline_code">status</code> and warns you.
                    </span>
                </div>
            </div>

            {/* ── Tips ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Tips</h2>
                <div className="lk_tips">
                    {[
                        ["🎯", "Keep issues small and specific.", <>
                            "Add a <code className="lk_inline_code">/health</code> endpoint that returns <code className="lk_inline_code">{'{ status: \'ok\' }'}</code>" works great. "Rewrite the auth system" does not.
                        </>],
                        ["📝", "Edit CLAUDE.md", "Describe your folder structure, naming conventions, and any rules Claude must follow for best results."],
                        ["💬", <>Use <code className="lk_inline_code">@claude</code> in comments</>, "Give Claude follow-up instructions or corrections without opening a new issue."],
                        ["🔍", <>Run <code className="lk_inline_code">lazykit status</code> if something stops working</>, "It pinpoints exactly what's misconfigured so you can fix it fast."],
                        ["🔁", "Re-run a failed workflow", <>Go to your repo → Actions tab → click the failed run → click <strong>"Re-run failed jobs"</strong>. Or just comment <code className="lk_inline_code">@claude</code> on the issue to trigger a fresh run.</>],
                    ].map(([icon, title, body], i) => (
                        <div className="lk_tip" key={i}>
                            <span className="lk_tip_icon">{icon}</span>
                            <div>
                                <strong>{title}</strong>
                                <p>{body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="lk_footer">
                <span className="lk_license">MIT License</span>
                <p>🦥 LazyKit is ready. Go be lazy.</p>
                <div className="lk_hero_actions">
                    <a href="https://www.npmjs.com/package/@slahon/lazykit" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">
                        Get LazyKit on npm
                    </a>
                    <a href="https://github.com/lahonsourav/lazykit" className="lk_btn lk_btn_secondary" target="_blank" rel="noreferrer">
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LazyKit;
