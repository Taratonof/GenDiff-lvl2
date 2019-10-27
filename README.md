"ВЫЧИСЛИТЕЛЬ ОТЛИЧИЙ".

Данная программа - это консольная утилита, которая вычисляет отличия между двумя файлами. Форматы файлов с которыми работает утилита: JSON, YML, INI.

Пример установки программы: https://asciinema.org/a/29j4owHb9hubH6Xy9J9ziP9qg.

Вызов справки, осуществляется командой "gendiff -h". Пример: https://asciinema.org/a/NPDnCu6F8hwD1TVT5CGZyuC2S.

Работа с файлами(можно указывать, как абсолютный так и относительный путь) осуществляется командой: gendiff <путь до первого файла> <путь до второго файла>.

Пример работы с форматом JSON и выводом различий в виде дерева: https://asciinema.org/a/iLx8gNHkD9cNmnFqoPk7ePnZD.

Пример работы с форматом INI и выводом различий в виде дерева: https://asciinema.org/a/TVvDhJ4M0oefHupQwZ5A57JyY.

Пример работы с форматом YML и выводом различий в виде дерева: https://asciinema.org/a/K3IsHjhCBuIcXZJT854KvW9xv.

Кроме стандартного вывода в виде дерева, возможен опциональный вывод в плоском("plain") либо JSON("json") форматах. Команда: gendiff --format [опция] <путь до первого файла> <путь до второго файла>.

Пример вывода в плоском формате: https://asciinema.org/a/y9qaiElhxKeAMmjxJQVU0qaaC.

Пример вывода в формате JSON: https://asciinema.org/a/NYzkUjm4VpdlU6NaltGCtelrL.

<a href="https://codeclimate.com/github/Taratonof/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/8ea662353481a59949da/maintainability" /></a>

[![Test Coverage](https://api.codeclimate.com/v1/badges/8ea662353481a59949da/test_coverage)](https://codeclimate.com/github/Taratonof/frontend-project-lvl2/test_coverage)

<a href="https://travis-ci.org/Taratonof/frontend-project-lvl2"><img src="https://travis-ci.org/Taratonof/frontend-project-lvl2.svg?branch=master"></a>
