<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = file_get_contents('php://input');
    $newEvent = json_decode($data, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        $events = json_decode(file_get_contents('./json/events.json'), true);
        
        if (json_last_error() === JSON_ERROR_NONE) {
            $events[] = $newEvent;

            file_put_contents('./json/events.json', json_encode($events));

            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al leer los eventos existentes']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos de entrada no válidos']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
