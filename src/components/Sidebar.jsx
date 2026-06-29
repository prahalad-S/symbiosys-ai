import React from 'react';

const sections = [
  {
    title: 'AI & AUTOMATION',
    links: [
      { id: 'ai-tools', label: 'AI Tools' },
      { id: 'frameworks-agents', label: 'Frameworks & Agents' },
      { id: 'mcp-tools', label: 'MCP Tools' }
    ]
  },
  {
    title: 'DATA & ANALYTICS',
    links: [
      { id: 'data-analytics', label: 'Data & Analytics' },
      { id: 'web-analytics', label: 'Web Analytics' }
    ]
  },
  {
    title: 'BACKEND & INFRA',
    links: [
      { id: 'backend-infra', label: 'Backend & Infra' },
      { id: 'hosting-domains', label: 'Hosting & Domains' },
      { id: 'web-scraping', label: 'Web Scraping' },
      { id: 'erp-business', label: 'ERP & Business' },
      { id: 'payments', label: 'Payments' }
    ]
  },
  {
    title: 'CLOUD PLATFORMS',
    links: [
      { id: 'azure', label: 'Azure' },
      { id: 'aws', label: 'AWS' }
    ]
  },
  {
    title: 'FRONTEND & FRAMEWORKS',
    links: [
      { id: 'web-frameworks', label: 'Web Frameworks' }
    ]
  },
  {
    title: 'MOBILE',
    links: [
      { id: 'mobile-frameworks', label: 'Frameworks' },
      { id: 'cicd-distribution', label: 'CI/CD & Distribution' }
    ]
  },
  {
    title: 'DEV TOOLS',
    links: [
      { id: 'source-control', label: 'Source Control' },
      { id: 'iac', label: 'Infrastructure as Code' }
    ]
  },
  {
    title: 'TESTING',
    links: [
      { id: 'testing', label: 'Testing' }
    ]
  },
  {
    title: 'DESIGN & ANIMATION',
    links: [
      { id: 'design-tools', label: 'Design Tools' },
      { id: 'animation', label: 'Animation' },
      { id: 'colors', label: 'Colors' },
      { id: 'icons', label: 'Icons' }
    ]
  },
  {
    title: 'PRODUCTIVITY',
    links: [
      { id: 'note-taking', label: 'Note Taking' },
      { id: 'task-management', label: 'Task Management' }
    ]
  }
];

function Sidebar({ database, activeCategory, setActiveCategory }) {
  const allResourcesCount = Object.values(database).reduce((acc, cat) => acc + (cat?.items?.length || 0), 0);

  return (
    <aside className="sidebar">
      <a 
        href="#all"
        className={`nav-link ${activeCategory === 'all' ? 'active' : ''}`}
        style={{ marginBottom: '1.5rem' }}
        onClick={(e) => { e.preventDefault(); setActiveCategory('all'); }}
      >
        <span>All Resources</span>
        <span className="badge">{allResourcesCount}</span>
      </a>

      {sections.map((section) => (
        <div className="nav-section" key={section.title}>
          <div className="nav-section-title">{section.title}</div>
          {section.links.map((link) => {
            const count = database[link.id]?.items?.length || 0;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeCategory === link.id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActiveCategory(link.id); }}
              >
                <span>{link.label}</span>
                <span className="badge">{count}</span>
              </a>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
