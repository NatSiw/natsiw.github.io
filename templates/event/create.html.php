<?php

/** @var \App\Model\Event $event */
/** @var \App\Service\Router $router */

$title = 'Create Event';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Event</h1>
    <form action="<?= $router->generatePath('event-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="event-create">
    </form>

    <a href="<?= $router->generatePath('event-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
