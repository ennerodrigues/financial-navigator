if (loading || !user) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="container mx-auto flex-1 p-4 md:p-8">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <PiggyBank className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-5xl">
              Financial César e Enne
            </h1>
          </div>
          <p className="mt-2 text-lg text-muted-foreground">
            Sua planilha interativa de despesas e receitas.
          </p>
        </header>
        <FinancialNavigator />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Financial César e Enne. All Rights Reserved.
      </footer>
    </div>
  );
}
