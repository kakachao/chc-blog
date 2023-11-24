import Link from 'next/link'
import type { NextraThemeLayoutProps } from 'nextra'

export default function Layout({ children, pageOpts, themeConfig }: NextraThemeLayoutProps) {
  return (
    <div className='h-full py-12'>
      <div className='h-full'>
        <header>
          {themeConfig.navs.map(item => <Link key={item.url} href={item.url}>
            {item.title}
          </Link>
          )}
        </header>
        <main>
          {children}
        </main>
        <footer>
          {themeConfig.footer}
        </footer>
      </div>

    </div>
  )
}