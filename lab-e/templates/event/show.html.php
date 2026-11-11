<?php

/** @var \App\Model\Event $event */
/** @var \App\Service\Router $router */

$title = "{$event->getTitle()} ({$event->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $event->getTitle() ?></h1>
    <p> <?= $event->getDate(); ?> </p>
    <p> <?= $event->getPlace(); ?> </p>
    <article>
        <?= $event->getDescription();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('event-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('event-edit', ['id'=> $event->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
