<?php
/** @var $event ?\App\Model\Event */
?>

<div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="event[title]" value="<?= $event ? $event->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="date">Date</label>
    <input type="date" id="date" name="event[date]" value="<?= $event ? $event->getDate() : '' ?>">
</div>

<div class="form-group">
    <label for="place">Place</label>
    <input type="text" id="place" name="event[place]" value="<?= $event ? $event->getPlace() : '' ?>">
</div>

<div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" name="event[description]"><?= $event? $event->getDescription() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
