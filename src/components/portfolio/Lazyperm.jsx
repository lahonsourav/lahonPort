import React from 'react';
import './lazykit.css';
import './lazyperm.css';

const Lazyperm = () => {
    return (
        <div className="lk_container">

            {/* ── Hero ── */}
            <div className="lk_hero">
                <span className="lk_emoji">🔐</span>
                <h1 className="lk_title">lazyperm</h1>
                <p className="lk_tagline">Stop babysitting Claude Code.</p>
                <p className="lk_description">
                    lazyperm is an open-source hook for Claude Code that silently approves safe commands and blocks
                    dangerous ones — so you only get interrupted when it actually matters.{' '}
                    <strong>No more "Allow git status?" prompts every 30 seconds.</strong>
                </p>
                <div className="lk_code_block lp_hero_install">
                    <code>npx lazyperm</code>
                </div>
                <div className="lk_hero_actions">
                    <a href="https://www.npmjs.com/package/lazyperm" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">npm</a>
                    <a href="https://marketplace.visualstudio.com/items?itemName=lahonsourav.lazyperm-claude" className="lk_btn lk_btn_secondary" target="_blank" rel="noreferrer">VS Code Extension</a>
                    <a href="https://github.com/lahonsourav/lazyperm" className="lk_btn lk_btn_secondary" target="_blank" rel="noreferrer">GitHub</a>
                </div>
                <p className="lp_hero_ext_note">Also available as an extension — search <strong>lazyperm</strong> in VS Code, Windsurf, or Cursor</p>
            </div>

            {/* ── Problem ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">The Problem</h2>
                <p className="lk_section_subtitle">
                    Claude Code's permission system is all-or-nothing by default. Every time Claude wants to run a
                    shell command — even completely harmless read-only ones — it asks:
                </p>
                <div className="lk_code_block lp_prompt_example">
                    <code className="lp_prompt_line">
                        <span className="lp_prompt_icon">❓</span>
                        Claude wants to run: <span className="lp_prompt_cmd">git status</span> — Allow?
                    </code>
                </div>
                <p className="lk_section_subtitle" style={{ marginTop: '1rem', marginBottom: 0 }}>
                    This happens dozens of times per session for <code className="lk_inline_code">ls</code>,{' '}
                    <code className="lk_inline_code">git log</code>, <code className="lk_inline_code">tsc --noEmit</code>,
                    and other zero-risk commands. It constantly breaks your flow and makes Claude Code frustrating
                    to use in auto mode.
                </p>
            </div>

            {/* ── How it works ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">How It Works</h2>
                <p className="lk_section_subtitle">
                    lazyperm installs a Python hook (<code className="lk_inline_code">guard.py</code>) into Claude
                    Code's hooks system. Every command is intercepted before the prompt appears:
                </p>

                <div className="lp_flow">
                    <div className="lp_flow_row">
                        <div className="lp_flow_node lp_flow_start">Claude wants to run a command</div>
                    </div>
                    <div className="lp_flow_arrow">↓</div>
                    <div className="lp_flow_row lp_flow_split">
                        <div className="lp_flow_node lp_flow_check">deny_patterns.json</div>
                        <div className="lp_flow_side">
                            <span className="lp_flow_label">match?</span>
                            <span className="lp_flow_arrow_right">→</span>
                            <div className="lp_flow_node lp_flow_block">BLOCK <span className="lp_flow_sub">always denied</span></div>
                        </div>
                    </div>
                    <div className="lp_flow_no_match">↓ no match</div>
                    <div className="lp_flow_row lp_flow_split">
                        <div className="lp_flow_node lp_flow_check">safe_patterns.json</div>
                        <div className="lp_flow_side">
                            <span className="lp_flow_label">match?</span>
                            <span className="lp_flow_arrow_right">→</span>
                            <div className="lp_flow_node lp_flow_allow">ALLOW <span className="lp_flow_sub">no prompt shown</span></div>
                        </div>
                    </div>
                    <div className="lp_flow_no_match">↓ no match</div>
                    <div className="lp_flow_row">
                        <div className="lp_flow_node lp_flow_prompt">Claude Code default <span className="lp_flow_sub">normal prompt behavior</span></div>
                    </div>
                </div>

                <div className="lk_callout" style={{ marginTop: '1.5rem' }}>
                    <span className="lk_callout_icon">📋</span>
                    <span>Patterns are plain regular expressions — fully customizable. Every decision is written to <code className="lk_inline_code">decisions.log</code> for auditing. The deny list is always checked first, so a command matching both lists is always blocked.</span>
                </div>
            </div>

            {/* ── Install ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Install</h2>

                <div className="lk_two_col lp_install_grid">
                    <div className="lk_mode_card lp_install_card">
                        <h3>npm CLI</h3>
                        <p>Install per-project or globally. Sets up the hook, patches your settings, and updates <code className="lk_inline_code">.gitignore</code> automatically.</p>
                        <div className="lk_code_block lp_install_code">
                            <code>npx lazyperm</code>
                            <code className="lk_comment"># or globally:</code>
                            <code>npx lazyperm --global</code>
                        </div>
                        <a href="https://www.npmjs.com/package/lazyperm" className="lk_btn lk_btn_primary lp_install_btn" target="_blank" rel="noreferrer">
                            View on npm
                        </a>
                    </div>

                    <div className="lk_mode_card lp_install_card">
                        <h3>VS Code Extension</h3>
                        <p>Install hook, edit safe/deny patterns, and open the decisions log — all from the Command Palette.</p>
                        <div className="lp_editor_list">
                            <div className="lp_editor_row">
                                <span className="lp_editor_icon">🆚</span>
                                <span>VS Code — <a href="https://marketplace.visualstudio.com/items?itemName=lahonsourav.lazyperm-claude" className="lk_link" target="_blank" rel="noreferrer">Marketplace</a></span>
                            </div>
                            <div className="lp_editor_row">
                                <span className="lp_editor_icon">🌊</span>
                                <span>Windsurf — search <code className="lk_inline_code">lazyperm</code> in Extensions</span>
                            </div>
                            <div className="lp_editor_row">
                                <span className="lp_editor_icon">🖱️</span>
                                <span>Cursor — search <code className="lk_inline_code">lazyperm</code> in Extensions</span>
                            </div>
                            <div className="lp_editor_row">
                                <span className="lp_editor_icon">🧩</span>
                                <span>VSCodium / Open VSX — <a href="https://open-vsx.org/extension/lahonsourav/lazyperm-vscode" className="lk_link" target="_blank" rel="noreferrer">Open VSX</a></span>
                            </div>
                        </div>
                        <div className="lk_callout lp_search_callout">
                            <span className="lk_callout_icon">🔍</span>
                            <span>Any editor that supports the VS Code Marketplace or Open VSX — just search <strong>lazyperm</strong> in the Extensions panel.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Default Safe Patterns ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Default Safe Patterns</h2>
                <p className="lk_section_subtitle">These commands are auto-allowed without a prompt:</p>
                <div className="lp_pattern_grid">
                    {[
                        ["Git read-only", "git status, git diff, git log, git branch, git show"],
                        ["File inspection", "ls, dir, cat, head, tail, grep, find, echo, wc, pwd"],
                        ["PowerShell read-only", "Get-ChildItem, Get-Content, Test-Path, Format-Table, …"],
                        ["Type checking & lint", "npx tsc, tsc --noEmit, npm run lint, npm test, npm audit"],
                        ["Python tests", "pytest, python -m pytest"],
                        ["Catch-all", ".* — auto-allow everything not in the deny list (removable)"],
                    ].map(([label, desc]) => (
                        <div className="lp_pattern_row" key={label}>
                            <span className="lp_pattern_label lp_label_allow">✓</span>
                            <div>
                                <strong>{label}</strong>
                                <p>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Default Deny Patterns ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Default Deny Patterns</h2>
                <p className="lk_section_subtitle">These commands are always blocked, regardless of safe patterns:</p>
                <div className="lp_pattern_grid">
                    {[
                        ["File deletion", "rm, del, Remove-Item"],
                        ["File writes", "> file, >> file, Set-Content, Out-File"],
                        ["Destructive git", "git push, git reset --hard, git clean"],
                        ["SQL", "DROP, DELETE FROM"],
                        ["System", "sudo, shutdown, Restart-Computer"],
                        ["Arbitrary execution", "Invoke-Expression, iex"],
                        ["Mutating HTTP", "-X POST/PUT/DELETE/PATCH"],
                    ].map(([label, desc]) => (
                        <div className="lp_pattern_row" key={label}>
                            <span className="lp_pattern_label lp_label_deny">✗</span>
                            <div>
                                <strong>{label}</strong>
                                <p>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Customize ── */}
            <div className="lk_section">
                <h2 className="lk_section_title">Customize</h2>
                <p className="lk_section_subtitle">
                    Edit <code className="lk_inline_code">.claude/hooks/safe_patterns.json</code> and{' '}
                    <code className="lk_inline_code">.claude/hooks/deny_patterns.json</code> directly, or use the
                    VS Code extension's Command Palette commands. Patterns are plain regex strings.
                </p>
                <div className="lk_two_col">
                    <div>
                        <p className="lk_sub_section_title" style={{ margin: '0 0 0.75rem' }}>safe_patterns.json</p>
                        <div className="lk_code_block lk_code_multiline">
                            <code>{'['}</code>
                            <code>{'  "git (status|diff|log)",'}</code>
                            <code>{'  "npm (test|run lint)",'}</code>
                            <code>{'  ".*"'}<span className="lk_comment"> // catch-all</span></code>
                            <code>{']'}</code>
                        </div>
                    </div>
                    <div>
                        <p className="lk_sub_section_title" style={{ margin: '0 0 0.75rem' }}>deny_patterns.json</p>
                        <div className="lk_code_block lk_code_multiline">
                            <code>{'['}</code>
                            <code>{'  "rm\\s+-rf",'}</code>
                            <code>{'  "git push",'}</code>
                            <code>{'  "DROP TABLE"'}</code>
                            <code>{']'}</code>
                        </div>
                    </div>
                </div>
                <div className="lk_callout" style={{ marginTop: '1rem' }}>
                    <span className="lk_callout_icon">💡</span>
                    <span>The deny list is checked first. A command matching both lists is always blocked. Remove the <code className="lk_inline_code">".*"</code> catch-all from safe patterns to switch to an explicit allowlist.</span>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="lk_footer">
                <span className="lk_license">MIT License</span>
                <p>🔐 One command. No more prompts.</p>
                <div className="lk_hero_actions">
                    <a href="https://www.npmjs.com/package/lazyperm" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">
                        Get lazyperm on npm
                    </a>
                    <a href="https://marketplace.visualstudio.com/items?itemName=lahonsourav.lazyperm-claude" className="lk_btn lk_btn_secondary" target="_blank" rel="noreferrer">
                        VS Code Extension
                    </a>
                    <a href="https://github.com/lahonsourav/lazyperm" className="lk_btn lk_btn_secondary" target="_blank" rel="noreferrer">
                        View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Lazyperm;
