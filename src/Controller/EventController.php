<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Event;
use App\Service\Router;
use App\Service\Templating;

class EventController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $events = Event::findAll();
        $html = $templating->render('event/index.html.php', [
            'events' => $events,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestEvent, Templating $templating, Router $router): ?string
    {
        if ($requestEvent) {
            $event = Event::fromArray($requestEvent);
            // @todo missing validation
            $event->save();

            $path = $router->generatePath('event-index');
            $router->redirect($path);
            return null;
        } else {
            $event = new Event();
        }

        $html = $templating->render('event/create.html.php', [
            'event' => $event,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $eventId, ?array $requestEvent, Templating $templating, Router $router): ?string
    {
        $event = Event::find($eventId);
        if (! $event) {
            throw new NotFoundException("Missing event with id $eventId");
        }

        if ($requestEvent) {
            $event->fill($requestEvent);
            // @todo missing validation
            $event->save();

            $path = $router->generatePath('event-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('event/edit.html.php', [
            'event' => $event,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $eventId, Templating $templating, Router $router): ?string
    {
        $event = Event::find($eventId);
        if (! $event) {
            throw new NotFoundException("Missing event with id $eventId");
        }

        $html = $templating->render('event/show.html.php', [
            'event' => $event,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $eventId, Router $router): ?string
    {
        $event = Event::find($eventId);
        if (! $event) {
            throw new NotFoundException("Missing event with id $eventId");
        }

        $event->delete();
        $path = $router->generatePath('event-index');
        $router->redirect($path);
        return null;
    }
}
