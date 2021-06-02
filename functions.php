<?php
function my_theme_enqueue_styles() {

    $parent_style = 'divi-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

//og meta-tags
function doctype_opengraph($output) {
  return $output . '
  xmlns:og="http://opengraphprotocol.org/schema/"
  xmlns:fb="http://www.facebook.com/2008/fbml"';
}

add_filter('language_attributes', 'doctype_opengraph');

function fb_opengraph() {
    global $post;

    if( is_single() || is_page() ) {
      if( has_post_thumbnail( $post->ID )) {
        $img_src = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), "large");
        $img_src = $img_src[0];
      } else {
            $img_src = get_stylesheet_directory_uri() . '/img/SB_Logo_Final_Hi-01_optimized.png';
        }
        if($excerpt = $post->post_excerpt) {
            $excerpt = strip_tags($post->post_excerpt);
            $excerpt = str_replace("", "'", $excerpt);
        } else {
            $excerpt = get_bloginfo('description');
        }
        ?>

    <meta property="og:title" content="<?php echo the_title(); ?>"/>
    <meta property="og:description" content="<?php echo $excerpt; ?>"/>
    <meta property="og:type" content="article"/>
    <meta property="og:url" content="<?php echo the_permalink(); ?>"/>
    <meta property="og:site_name" content="<?php echo get_bloginfo(); ?>"/>
    <meta property="og:image" content="<?php echo $img_src; ?>"/>
    <!-- Include this to make the og:image larger -->
    <meta name="twitter:card" content="summary_large_image">

<?php
    } else {
        return;
    }
}
add_action('wp_head', 'fb_opengraph', 5);

//opengraph home page
function add_opengraph() {
  if (is_home()) {
?>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Spirit Bomb" />
  <meta property="og:description" content="A Virtual Artist Label. An expanding universe of beings that shatter physical and temporal barriers. These beings act as vessels for musicians and visual artists, created from the ground up for the post-digital world." />
  <meta property="og:url" content="https://spiritbomb.ai" />
  <meta property="og:site_name" content="Spirit Bomb" />
  <meta property="og:image" content="https://spiritbomb.ai/image/SB_Logo_Final_Hi-01_optimized.png" />
  <meta property="og:locale" content="en_US" />

<?php
}
}
add_action('wp_head', 'add_opengraph', 5);

// x-frame SAMEORIGIN (iframe fix for /radio)
//add_action( 'send_headers', 'send_frame_options_header', 10, 0 );

?>

<?php
//dynamic year shortcode
function year_shortcode () {
$year = date_i18n ('Y');
return $year;
}
add_shortcode ('year', 'year_shortcode');
?>
