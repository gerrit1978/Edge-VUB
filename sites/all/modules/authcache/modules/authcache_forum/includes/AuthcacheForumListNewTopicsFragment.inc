<?php
/**
 * @file
 * Defines a personalization fragment for retrieving new-flags on a list of
 * forum topics.
 */

/**
 * Fragment for retrieving new-flags on a list of forum topics.
 */
class AuthcacheForumListNewTopicsFragment implements AuthcacheP13nFragmentInterface {
  /**
   * Number of new forum topics for user.
   *
   * @see forum.module
   */
  public function render($tid, $subject, $context) {
    global $user;

    // Include node.module for NODE_NEW_LIMIT.
    include_once DRUPAL_ROOT . '/modules/node/node.module';
    include_once DRUPAL_ROOT . '/modules/forum/forum.module';

    $result = '';
    $new = (int) _forum_topics_unread($tid, $user->uid);
    if ($new) {
      $result = format_string('<span class="authcache-comment-new" data-new-count="@new"></span>', array('@new' => $new));
    }

    return $result;
  }
}
