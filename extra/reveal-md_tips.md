# Reveal-md tips

## Define slide attributes

    <!-- .slide: data-background="#ff0000" data-transition="zoom" -->
    ## My Slide Title

## Fragements

    - Point 1
    <!-- .element: class="fragment" data-fragment-index="1" -->
    - Point 2
    <!-- .element: class="fragment" data-fragment-index="2" -->
    - Point 3
    <!-- .element: class="fragment" data-fragment-index="3" -->

## Speaker notes:

    Note: speaker notes FTW!

## Small font:

    <small>This is a side note</small>

## Images

    ![](https://myImage.jpg)
    ![](./images/myImage.png)

    <img src="https://myImage.jpg" style="width: 400px;"/>

## Reveal-md Startup

    // other theme
    > reveal-md slides.md --title 'ES6 and beyond' --theme Moon
    (Black - White - League - Sky - Beige - Simple - Serif - Blood - Night - Moon - Solarized)

    // other hightlight theme (http://jmblog.github.io/color-themes-for-highlightjs/)
    > reveal-md slides.md --title 'ES6 and beyond' --highlightTheme github

