# Prezentare idee proiect dezvoltarea aplicatiilor web 

## Idee, nume proiect

* Numele siteului/aplicației web va fi FMI-lib
* Acesta își propune să rezolve problema repourilor de github cu resurse împraștiate pe tot internetul
* Astfel o sa fie o platformă care să aducă la un loc toate githuburile cu resurse cunoscute pentru un anumit curs și pe lângă asta o să și aibă lecții interactive scrise de studenți pentru fiecare curs (în stilul Brilliant)
* Avem deja un design language stabilit si un front end pentru landing page, urmează să facem ca parte a acestui proiect tot ce ține de backendul în go


## Tipuri de useri

* Vizitator - poate accesa toate cursurile și resursele
* User logat - la fel ca user, dar are un dashboard în care poate salva progresul la anumite cursuri
* Editor simplu - poate scrie cursuri, dar ele trebuie aprobate înainte să fie publicate pe site
* Editor reviewer - aprobă lecții spre publicare pe site
* Admin - putere deplină asupra aplicației

## Frontend

### Pagini statice de prezentare

* Landing page - prezentare generală a siteului
* Despre/About - prezentare detaliată a siteului

### Pagini dinamice

* Cursuri - locul unde se pot găsi cursurile și materialele pe site
* Contribuie - pagina cu informații despre contribuții
* Dashboard - un fel de dashboard pentru userii logați
* Editor - un editor minimal pentru scrierea lecțiilor pentru cei cu acest drept

## Tehnologii 

### Fronend 

* React
* Tailwind
* posibil mdx pentru formatul cursurilor custom

### Backend 

* Golang
* Gin
* SQL-lite

