import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

/**
 * Shared shell for the applicant and admin areas: sidebar + content area.
 * `role` controls which nav items Sidebar renders.
 */
export default function DashboardLayout({ role = 'applicant', children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      {!collapsed && (
        <Sidebar
          role={role}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          onCollapse={() => setCollapsed(true)}
        />
      )}
      <div className="app-main">
        <div className="app-content">
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Open menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-navy-900)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                width: 40,
                height: 40,
                marginBottom: 16,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Menu size={18} />
            </button>
          )}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'var(--color-white)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
            }}
          >
            <Menu size={18} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}