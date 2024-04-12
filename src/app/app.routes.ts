import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },

  {
    path: 'principal',
    loadComponent: () => import('./pages/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },

  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./pages/recuperar-senha/recuperar-senha.page').then( m => m.RecuperarSenhaPage)
  },
  {
    path: 'gerenciar-perguntas',
    loadComponent: () => import('./pages/gerenciar-perguntas/gerenciar-perguntas.page').then( m => m.GerenciarPerguntasPage)
  },
  {
    path: 'pagina-pontuacao-quiz',
    loadComponent: () => import('./pages/pagina-pontuacao-quiz/pagina-pontuacao-quiz.page').then( m => m.PaginaPontuacaoQuizPage)
  },
  {
    path: 'pagina-pre-quiz',
    loadComponent: () => import('./pages/pagina-pre-quiz/pagina-pre-quiz.page').then( m => m.PaginaPreQuizPage)
  }


];
