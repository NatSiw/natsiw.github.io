<?php

/** @var \App\Model\Event $event */
/** @var \App\Service\Router $router */

$title = "Edit Event {$event->getTitle()} ({$event->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('event-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="event-edit">
        <input type="hidden" name="id" value="<?= $event->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('event-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('event-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="event-delete">
                <input type="hidden" name="id" value="<?= $event->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
