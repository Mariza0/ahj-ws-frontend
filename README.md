

![CI](https://github.com/Mariza0/ahj-hw2/actions/workflows/web.yml/badge.svg)


[Ссылка на Github Pages](https://mariza0.github.io/ahj-hw2/)

# Домашнее задание к занятию "2. DOM"

Правила сдачи задания:

Важно: в рамках этого ДЗ можно использовать любой менеджер пакетов
Важно: всё должно собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через Appveyor.
В README.md должен быть размещён бейджик сборки и ссылка на Github Pages
В качестве результата присылайте проверяющему ссылки на ваши GitHub-проекты
Перемещение элемента
Легенда
Вы решили развлечься и реализовать некое подобие игры, где гномы (или другие существа), выскакивают из "отверстий" и по ним нужно бить молотком:

![](src/img/GracefulMiniatureBustard-small.gif)

Copyright gfycat.com

Описание
Соберите инфраструктуру проекта на базе Webpack, ESLint, Babel, Jest, Webpack Dev Server.

Поскольку мы более гуманны, вам нужно реализовать лишь первую часть этой игры - перемещение объекта в DOM Tree.

Для этого самостоятельно разработайте игровое поле 4x4 и персонажа в виде картинки img (при загрузке страницы должен программно генерироваться и ставиться в рандомную позицию внутри игрового поля). С помощью функции setInterval запланируйте перемещение существующего объекта img в другое поле (алгоритм - рандомное перемещение, без перемещения в то же самое поле).

Для картинки персонажа используйте следующую:

![](src/img/goblin.png)

Важно: не используйте removeChild! Проверьте, что будет, если Node изменить родителя.

Всё должно собираться через Webpack (включая картинки и стили) и выкладываться на Github Pages через CI.

В качестве результата пришлите проверяющему ссылку на ваш GitHub-проект. Не забудьте установить бейджик сборки.