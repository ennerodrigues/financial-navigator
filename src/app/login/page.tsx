"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank } from 'lucide-react';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      // Aqui você pode usar um toast para mostrar o erro para o usuário
    }
  };
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }
  
  if (user) {
    return null; // ou um redirecionamento, já tratado no useEffect
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="inline-flex items-center justify-center gap-3 mb-4">
            <PiggyBank className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-3xl font-bold tracking-tight text-primary">
              Financial
            </h1>
          </div>
          <CardTitle>Bem-vindo(a)!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-6">
            Faça login com sua conta Google para acessar sua planilha financeira.
          </p>
          <Button onClick={handleGoogleSignIn} className="w-full" disabled={loading}>
            {loading ? 'Aguarde...' : 'Entrar com Google'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
