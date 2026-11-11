<?php

/** @var \App\Model\Event[] $events */
/** @var \App\Service\Router $router */

$title = 'Event List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Events List</h1>

    <a href="<?= $router->generatePath('event-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($events as $event): ?>
            <li><h3><?= $event->getTitle() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('event-show', ['id' => $event->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('event-edit', ['id' => $event->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
