  
; Core version
; ------------
; Each makefile should begin by declaring the core version of Drupal that all
; projects should be compatible with.
  
core = 7.x
  
; API version
; ------------
; Every makefile needs to declare its Drush Make API version. This version of
; drush make uses API version `2`.
  
api = 2
  
; Core project
; ------------
; In order for your makefile to generate a full Drupal site, you must include
; a core project. This is usually Drupal core, but you can also specify
; alternative core projects like Pressflow. Note that makefiles included with
; install profiles *should not* include a core project.
  
; Drupal 7.x. Requires the `core` property to be set to 7.x.
projects[] = drupal

  
  
; Modules
; --------
projects[] = acl
projects[] = admin_menu
projects[] = autocomplete_deluxe
projects[] = backup_migrate
projects[] = block_class
projects[] = blockcache_alter
projects[] = boost
projects[] = ckeditor
projects[] = ckeditor_link
projects[] = colorbox
projects[] = colorbox_node
projects[] = content_access
projects[] = context
projects[] = ctools
projects[] = date
projects[] = devel
projects[] = devel_themer
projects[] = draggableviews
projects[] = email
projects[] = entity
projects[] = entityreference
projects[] = features
projects[] = features_extra
projects[] = fences
projects[] = field_collection
projects[] = google_analytics
projects[] = i18n
projects[] = imce
projects[] = jquery_update
projects[] = l10n_update
projects[] = libraries
projects[] = lightbox2
projects[] = location
projects[] = menu_attributes
projects[] = metatag
projects[] = modernizr
projects[] = module_filter
projects[] = mollom
projects[] = node_clone
projects[] = nodequeue
projects[] = page_title
projects[] = pathauto
projects[] = prev_next
projects[] = rules
projects[] = references
projects[] = semanticviews
projects[] = simplehtmldom
projects[] = site_map
projects[] = stringoverrides
projects[] = strongarm
projects[] = token
projects[] = translation_overview
projects[] = uuid
projects[] = uuid_features
projects[] = variable
projects[] = views
projects[] = views_bulk_operations
projects[] = views_content_cache
projects[] = webform
projects[] = webform_ajax
