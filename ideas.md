# Prezentare idee proiect dezvoltarea aplicațiilor web

## Idee, nume proiect

* Numele site-ului/aplicației web va fi FMI-lib
* Acesta își propune să rezolve problema repo-urilor de GitHub cu resurse împrăștiate pe tot internetul
* Astfel o să fie o platformă care aduce la un loc toate GitHub-urile cu resurse cunoscute pentru un anumit curs și, pe lângă asta, o să aibă lecții interactive scrise de studenți pentru fiecare curs (în stilul Brilliant)
* O lecție e împărțită în pași scurți. Fiecare pas are text în markdown și, opțional, o întrebare cu răspuns verificat pe loc sau un artefact interactiv (o pagină HTML, de exemplu o vizualizare a unui algoritm de sortare)
* Materialele pot fi folosite și de un asistent AI: fiecare lecție se poate copia ca markdown, iar site-ul are un endpoint MCP prin care Claude sau ChatGPT pot căuta și citi lecțiile
* Avem deja un design language stabilit și un front end pentru landing page, urmează să facem ca parte a acestui proiect tot ce ține de backend-ul în Go

## Tipuri de useri

* Vizitator: poate vedea landing page-ul, cursurile, resursele și lecțiile publicate, plus formularele de login și înregistrare
* Membru: are cont, își gestionează profilul, are un dashboard în care își salvează progresul la lecții, poate vota materialele și poate scrie lecții, resurse și artefacte proprii (le poate edita și șterge). Ce scrie un membru apare pe site după ce e aprobat de un admin
* Admin: putere deplină asupra aplicației, aprobă sau respinge lecțiile trimise, poate modifica orice resursă și gestionează userii și rolurile lor

## Profil

* Nume, email, descriere, poză de profil
* Profilul poate fi public sau privat. Un profil privat se vede complet doar de cei care au trimis o cerere de urmărire și au fost acceptați
* Pe profil apar lecțiile publicate de user și cursurile la care învață

## Căutare, filtrare, sortare, paginare

* Căutare după titlu și descriere
* Filtrare după curs, an, semestru și tipul materialului (repo, lecție, artefact)
* Sortare după data adăugării, data modificării, alfabetic și după voturi
* Toate listele sunt paginate (limit/offset)

## Frontend

### Pagini statice de prezentare

* Landing page: prezentare generală a site-ului, cele mai noi și cele mai votate lecții, cursurile principale
* Despre/About: prezentare detaliată a site-ului

### Pagini dinamice

* Cursuri: locul unde se pot găsi cursurile și materialele pe site, cu căutare și filtre
* Lecție: pașii lecției, întrebările, artefactele într-un iframe izolat și butonul de copiere ca markdown
* Contribuie: pagina cu informații despre contribuții
* Dashboard: progresul la lecții, lecțiile proprii și cheile API pentru MCP
* Editor: un editor de markdown cu previzualizare live pentru scrierea lecțiilor
* Admin: lecțiile care așteaptă aprobare și lista de useri

## Validare

* Fiecare formular e validat și în frontend și în backend, cu mesaje de eroare clare
* Exemple de reguli: email valid și unic, parolă de minim 8 caractere, link-ul unei resurse trebuie să fie de pe github.com, anul între 1 și 3, semestrul 1 sau 2, o lecție are cel puțin un pas, o întrebare are exact un răspuns corect

## Date de test

* Baza de date vine populată cu cursurile reale de la FMI, repo-uri publice de resurse pe care le știm și câteva lecții scrise de noi, plus useri fictivi cu progres și voturi

## Tehnologii

### Frontend

* React
* Tailwind
* Markdown pentru lecții, artefactele HTML rulează într-un iframe sandbox

### Backend

* Golang
* Gin
* SQLite cu GORM, migrații cu golang-migrate
* Arhitectură pe straturi: handlers, services, repositories
* Autentificare cu JWT, parole cu bcrypt, middleware care verifică rolul pe fiecare rută
* Endpoint MCP în același server, cu cheie API generată din dashboard (în baza de date se păstrează doar hash-ul ei)

### Deploy

* Un singur container Docker pe un VPS (Coolify), deploy automat din GitHub Actions la fiecare push pe main
