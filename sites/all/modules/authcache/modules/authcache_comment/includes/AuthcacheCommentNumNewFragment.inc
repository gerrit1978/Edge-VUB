<?php
/**
 * @file
 * Defines a personalization fragment for retrieving the number of new comments
 * on a node.
 */

/**
 * Personalization fragment for retrieving the number of new comments on a node.
 *
 * @see node.module
 */
class AuthcacheCommentNumNewFragment implements AuthcacheP13nFragmentInterface {
  /**
   * Number of new comments for given nids.
   */
  public function render($nid, $subject, $context) {
    $result = '';

    include_once DRUPAL_ROOT . '/modules/node/node.module';
    include_once DRUPAL_ROOT . '/modules/comment/comment.module';

    $new = comment_num_new($nid);
    if ($new) {
      $result = format_string('<span class="authcache-comment-new" data-new-count="@new"></span>', array('@new' => $new));
    }

    return $result;
  }
}
