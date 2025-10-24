@echo off
echo ========================================
echo  DEPLOY MPSH-PROTEKTOR PARA GITHUB
echo ========================================

echo.
echo 1. Inicializando repositorio Git...
git init

echo.
echo 2. Adicionando todos os arquivos...
git add .

echo.
echo 3. Fazendo commit inicial...
git commit -m "feat: Landing page MPSH-PROTEKTOR completa com SEO otimizado"

echo.
echo 4. Configurando branch main...
git branch -M main

echo.
echo 5. Adicionando repositorio remoto...
git remote add origin https://github.com/maginfnews/protektor.git

echo.
echo 6. Fazendo push para GitHub...
git push -u origin main

echo.
echo ========================================
echo  DEPLOY CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Proximo passo:
echo 1. Acesse: https://vercel.com
echo 2. Conecte com GitHub
echo 3. Selecione: maginfnews/protektor
echo 4. Deploy automatico!
echo.
echo URL do projeto: https://github.com/maginfnews/protektor
echo.
pause
