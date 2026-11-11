<?php
namespace App\Model;

use App\Service\Config;

class Event
{
    private ?int $id = null;
    private ?string $title = null;
    private ?string $date = null;
    private ?string $place = null;
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Event
    {
        $this->id = $id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): Event
    {
        $this->title = $title;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(?string $date): Event
    {
        $this->date = $date;

        return $this;
    }

    public function getPlace(): ?string
    {
        return $this->place;
    }

    public function setPlace(?string $place): Event
    {
        $this->place = $place;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): Event
    {
        $this->description = $description;

        return $this;
    }

    public static function fromArray($array): Event
    {
        $event = new self();
        $event->fill($array);

        return $event;
    }

    public function fill($array): Event
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['title'])) {
            $this->setTitle($array['title']);
        }
        if (isset($array['date'])) {
            $this->setDate($array['date']);
        }
        if (isset($array['place'])) {
            $this->setPlace($array['place']);
        }
        if (isset($array['description'])) {
            $this->setDescription($array['description']);
        }

        return $this;
    }

    public static function  findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM event';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $events = [];
        $eventsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($eventsArray as $eventArray) {
            $events[] = self::fromArray($eventArray);
        }

        return $events;
    }

    public static function find($id): ?Event
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM event WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $eventArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $eventArray) {
            return null;
        }
        $event = Event::fromArray($eventArray);

        return $event;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO event (title, date, place, description) VALUES (:title, :date, :place, :description)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'title' => $this->getTitle(),
                'date' => $this->getDate(),
                'place' => $this->getPlace(),
                'description' => $this->getDescription(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE event SET title = :title, date = :date, place = :place, description = :description WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':title' => $this->getTitle(),
                ':date' => $this->getDate(),
                ':place' => $this->getPlace(),
                ':description' => $this->getDescription(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM event WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setTitle(null);
        $this->setDate(null);
        $this->setPlace(null);
        $this->setDescription(null);
    }
}
