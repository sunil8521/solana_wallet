// import { ModeToggle } from "./Mode-toggle"

export function Layout({ children, showHeader = true }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && (
        <header className="border-b">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <img src="/solana-logo.svg" alt="Solana Logo" width={32} height={32} />
              <h1 className="text-xl font-bold">Solana Wallet</h1>
            </div>
            {/* <ModeToggle /> */}
          </div>
        </header>
      )}
      <main className=" flex-grow">{children}</main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Solana Wallet. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

