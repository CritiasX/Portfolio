<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia></title>
        <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}?v=1">
    @vitereactrefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
    <body>
        @inertia
    </body>
</html>
