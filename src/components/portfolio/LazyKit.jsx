import React from 'react';
import './lazykit.css';

const LazyKit = () => {
    return (
        <div className="lk_container">
            <div className="lk_hero">
                <span className="lk_emoji">🦥</span>
                <h1 className="lk_title">LazyKit</h1>
                <p className="lk_tagline">Drop an issue, get a PR.</p>
                <p className="lk_description">
                    LazyKit wires Claude AI directly into your GitHub repo. Open an issue from your phone, your tablet, or anywhere — Claude reads it, writes the code, and opens a pull request entirely in the cloud.{' '}
                    <strong>No laptop. No terminal. No IDE. Nothing running on your machine.</strong>
                </p>
                <div className="lk_hero_actions">
                    <a href="https://www.npmjs.com/package/@slahon/lazykit" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">npm</a>
                    <a href="https://github.com/lahonsourav/lazykit" className="lk_btn lk_btn_secondary" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </div>

            <div className="lk_section">
                <h2 className="lk_section_title">Quickstart</h2>
                <div className="lk_code_block">
                    <code>npx @slahon/lazykit@latest init</code>
                </div>
                <p className="lk_note">Run this inside your project folder. LazyKit handles everything else automatically.</p>
            </div>

            <div className="lk_section">
                <h2 className="lk_section_title">How it works</h2>
                <div className="lk_steps">
                    {[
                        ["1", "Open an issue", "Go to your repo on GitHub → Issues → New issue. Use the LazyKit Task template. Describe what you want Claude to build — the lazykit label is applied automatically."],
                        ["2", "GitHub Actions kicks in", "The moment the issue is submitted, GitHub detects the lazykit label and triggers a workflow run. Watch it live in the Actions tab in real time."],
                        ["3", "Claude reads, thinks, and writes", "Inside the Actions runner, Claude explores your codebase, writes the code changes, and commits them to a new branch."],
                        ["4", "A pull request appears", "When Claude is done, it opens a pull request against your main branch — just like a PR from a teammate. You get a GitHub notification."],
                        ["5", "You review and merge", "Look over the diff, use @claude in comments for follow-up instructions, then merge when you're happy."],
                    ].map(([num, title, desc]) => (
                        <div className="lk_step" key={num}>
                            <span className="lk_step_num">{num}</span>
                            <div>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lk_section">
                <h2 className="lk_section_title">Commands</h2>
                <div className="lk_command_grid">
                    {[
                        ["lazykit init", "Set up LazyKit in your repo"],
                        ["lazykit status", "Health check — verify everything is wired up correctly"],
                        ["lazykit update", "Regenerate workflow and CLAUDE.md"],
                        ["lazykit remove", "Cleanly remove LazyKit from your repo"],
                    ].map(([cmd, desc]) => (
                        <div className="lk_command_card" key={cmd}>
                            <code className="lk_command">{cmd}</code>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lk_section">
                <h2 className="lk_section_title">What <code>init</code> does</h2>
                <div className="lk_init_steps">
                    {[
                        ["Detects repo", "Reads your git remote to find your GitHub repo"],
                        ["Detects stack", "Auto-detects your stack from package.json, go.mod, Cargo.toml, etc."],
                        ["Creates workflow", ".github/workflows/lazykit.yml — the GitHub Actions automation"],
                        ["Creates issue template", ".github/ISSUE_TEMPLATE/lazykit.md — auto-applies the trigger label"],
                        ["Creates CLAUDE.md", "Project guide so Claude understands your codebase"],
                        ["Creates label", "Creates the trigger label on GitHub"],
                        ["Sets token", "Runs claude setup-token and stores it as CLAUDE_CODE_OAUTH_TOKEN in your repo secrets"],
                        ["Commits and pushes", "Commits all generated files and pushes to GitHub"],
                    ].map(([step, desc]) => (
                        <div className="lk_init_row" key={step}>
                            <span className="lk_init_step">{step}</span>
                            <span className="lk_init_desc">{desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lk_footer">
                <p>🦥 LazyKit is ready. Go be lazy.</p>
                <a href="https://www.npmjs.com/package/@slahon/lazykit" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">
                    Get LazyKit on npm
                </a>
            </div>
        </div>
    );
};

export default LazyKit;
