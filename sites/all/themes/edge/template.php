<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function edge_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  edge_preprocess_html($variables, $hook);
  edge_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function edge_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function edge_preprocess_page(&$variables, $hook) {
  // Remove title from homepage
  if (drupal_is_front_page()) {
    $variables['title'] = "";
  } 
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */

function edge_preprocess_node(&$variables, $hook) {
  if ($variables['type'] == 'frontpage') {
    $node = $variables['node'];
    $body = field_get_items('node', $node, 'body');
    $variables['body'] = $body[0]['safe_value'];
/*
    print "<pre>";
    print_r($node);
    print "</pre>";
*/
    $visual_field = field_get_items('node', $node, 'field_frontpage_visual');
    $visual_uri = file_create_url($visual_field[0]['uri']);
    $variables['frontpage_visual'] = $visual_uri;
  }

}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function edge_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function edge_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function edge_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];

  // By default, Zen will use the block--no-wrapper.tpl.php for the main
  // content. This optional bit of code undoes that:
  //if ($variables['block_html_id'] == 'block-system-main') {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('block__no_wrapper'));
  //}
}
// */

/**
 * Alters the search form
 */
function edge_form_alter(&$form, &$form_state, $form_id) {
  if ($form_id == 'search_block_form') {
    $form['search_block_form']['#weight'] = 1000;
    $form['search_block_form']['#attributes']['placeholder'] = 'search';
  }
}


/**
 * Theme a field
 */
function edge_preprocess_field(&$variables, $hook) {
  if ($variables['element']['#field_name'] == 'field_pub_authors') {
    $items = $variables['element']['#items'];
    $authors_array = array();
    foreach ($items as $item) {
      $field_collection_item = entity_metadata_wrapper('field_collection_item', $item['value']);
      $author_type = $field_collection_item->field_pub_authors_type->value();
      switch ($author_type) {
        case 'internal':
          $author_internal_field = $field_collection_item->field_pub_authors_internal->value();
          if ($author_internal_field) {
            $author_internal_uid = $author_internal_field->uid;          
            $author_internal = entity_metadata_wrapper('user', $author_internal_uid);
	          $author_internal_firstname = $author_internal->field_user_firstname->value();
	          $author_internal_lastname = $author_internal->field_user_lastname->value();
	          $author_internal_fullname = strtoupper($author_internal_lastname) . ", " . $author_internal_firstname;
	          $author_internal_output = l($author_internal_fullname, 'user/' . $author_internal_uid);
	          $authors_array[] = $author_internal_output;
          }
          break;

        
        case 'external':
          $authors_array[] = $field_collection_item->field_pub_authors_external->value();
          break;
      }
    }

    unset($variables['items']);
    $i = 0;
    if (count($authors_array) == 1) {
      $authors_final_output = $authors_array[0];
    } else {
	    $authors_final_output = "";
	    foreach($authors_array as $author) {
	      if ($i == 0) {
	        $authors_final_output = $authors_array[0];
	      } else if ($i < (count($authors_array)-1)) {
	        $authors_final_output .= ", " . $authors_array[$i];
	      } else {
	        $authors_final_output .= " & " . $authors_array[$i];
	      }
        $i++;
	    }
	  }
    $variables['items'][0] = array('#markup' => $authors_final_output);
  }

  if ($variables['element']['#field_name'] == 'field_pub_editors') {
    $items = $variables['element']['#items'];
    $editors_array = array();
    foreach ($items as $item) {
      $field_collection_item = entity_metadata_wrapper('field_collection_item', $item['value']);
      $editor_type = $field_collection_item->field_pub_editors_type->value();
      switch ($editor_type) {
        case 'internal':
          $editor_internal_field = $field_collection_item->field_pub_editors_internal->value();
          if ($editor_internal_field) {
            $editor_internal_uid = $author_internal_field->uid;          
            $editor_internal = entity_metadata_wrapper('user', $editor_internal_uid);
	          $editor_internal_firstname = $editor_internal->field_user_firstname->value();
	          $editor_internal_lastname = $editor_internal->field_user_lastname->value();
	          $editor_internal_fullname = strtoupper($editor_internal_lastname) . ", " . $editor_internal_firstname;
	          $editor_internal_output = l($editor_internal_fullname, 'user/' . $editor_internal_uid);
	          $editors_array[] = $editor_internal_output;
          }
          break;

        
        case 'external':
          $editors_array[] = $field_collection_item->field_pub_editors_external->value();
          break;
      }
    }

    unset($variables['items']);
    $i = 0;
    if (count($editors_array) == 1) {
      $editors_final_output = $editors_array[0];
    } else {
	    $editors_final_output = "";
	    foreach($editors_array as $editor) {
	      if ($i == 0) {
	        $editors_final_output = $editors_array[0];
	      } else if ($i < (count($editors_array)-1)) {
	        $editors_final_output .= ", " . $editors_array[$i];
	      } else {
	        $editors_final_output .= " & " . $editors_array[$i];
	      }
        $i++;
	    }
	  }
    $variables['items'][0] = array('#markup' => $editors_final_output);
  }

  
  
}

/**
 * Override views title for team pages
 */
function edge_views_pre_render(&$view) { 
  if ($view->name == 'team_members' && $view->current_display == 'page_4') {
    $view->build_info['title'] = $view->build_info['substitutions']["%1"];
  }
}

/**
 * Add the user's email address to profile page
 */
function edge_preprocess_user_profile(&$variables) {
  $email = $variables['elements']['#account']->mail;
  $variables['user_profile']['user_email'] = array('#markup' => "<a href='mailto:$email'>$email</a>");
}