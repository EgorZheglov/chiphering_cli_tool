1. Ссылка на задание/Link to task:
https://github.com/rolling-scopes-school/basic-nodejs-course

2.Done at 09/11/21; deadline 15/11/21

3.Предварительная оценка/points of task done:

-В README.md описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению.
+10 баллов

-Если переданы все аргументы и они корректны, приложение читает из файла и записывает в файл преобразованный текст, при этом предыдущие записи не удаляются
+20 баллов.

-Приложение работает в соответствии с описанными в задании примерами 
+30 баллов.

-Если аргументы input и/или output ведут к несуществующему файлу либо директории,приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0.
+10 баллов.

-Если любой из аргументов дублируется, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0.
+10 баллов.

-Если config невалиден, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 
+20 баллов.

-Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin
+10 баллов.

-Если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout
+10 баллов

-Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются
+20 баллов.

-Если текст вводится из консоли, то программа не завершается после выполнения шифровки/дешифровки введенного текста
+10 баллов

-Кодовая база не находится в одном файле, а разделена на файлы в соответствии с выполняемыми задачами
+10 баллов

С учетом возможных ошибок - +/- 150 баллов.

Run application: type "node chiper -c (or) -config "chipher-code" -i "./your_input.txt" -o "./your_output.txt"" 
you can not use files amd their flags, if you want to use console. example:

with files:

node chiper.js -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"

input.txt :This is secret. Message about "_" symbol!

output.txt :Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!

without files:

node chiper.js -c "C1-C1-R0-A"

then type into cli and get result in stdout.

