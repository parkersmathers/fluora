$(function () {

  //
  // LANDING
  // Handle mouse and touch events for landing links and touch cards
  //

  var touchCountLanding = 1
  var target

  // Handle events for hovering over links and switching views

  $('h1 span').each(function () {
    var button = $(this)
    var link = button.find('a')
    var href = link.attr('href')
    if (href === 'work.html') { href -= '.html' }
    var cards = $('#grid').find('.' + href + '')

    // Handle touch events on links

    function handleOneTouchLinks(e) {
      if ($('.card-content').hasClass('all-gray')) {
        touchCountHere--
        $('h1 span a#work').trigger('mouseout')
      }
      if (target && (target !== e.target)) {
        $(target).trigger('mouseout')
        target = e.target
        $(target).trigger('mouseover')
      } else {
        target = e.target
        $(target).trigger('mouseover')
      }
      touchCountLanding++
    }

    function handleTwoTouchesLinks(e) {
      if ($('.card-content').hasClass('all-gray')) {
        $('h1 span a#work').trigger('mouseout')
        touchCountHere--
      }
      if (e.target === target) {
        $(target).trigger('click')
      } else {
        $(target).trigger('mouseout')
        target = e.target
        $(target).trigger('mouseover')
      }
    }

    $(this).on( {

      'touchstart': function (e) {
        e.preventDefault()
        switch (touchCountLanding) {
          case 1: handleOneTouchLinks(e); break;
          case 2: handleTwoTouchesLinks(e); break;
          default: console.log('not supported'); break;
        }
      }
    }, '.hot')

    // Handle mouse events

    $(this).on( {

      'mouseover': function (e) {
        e.preventDefault()
        e.stopPropagation()
        button.addClass('current z2')
        cards.addClass('current z1')
        $('#landing').addClass('z2')
      },
      'mouseout': function (e) {
        e.preventDefault()
        e.stopPropagation()
        button.removeClass('current z2')
        cards.removeClass('current z1 touch-card')
        $('#landing').removeClass('z2')
      },
      'click': function (e) {
        e.preventDefault()
        e.stopPropagation()
        $('#landing').removeClass('active').addClass('hidden')
        cards.removeClass('current z1').addClass('active z1')
        button.removeClass('current z2').addClass('active z2')
        $('a').removeClass('hot')
      }
    }, '.hot')
  })

  // Handle touch events on cards

  $('#main').on( {
    'touchstart': function (e) {
      e.preventDefault()
      $('#landing').removeClass('active z2').addClass('hidden')
      $('.current').removeClass('current').addClass('active')
      $('.touch-card').removeClass('touch-card').addClass('active z1')
    }
  }, '.touch-card')

  // Handle mouse and touch events on 'here' button

  var touchCountHere = 1

  function handleOneTouchHere(e) {
    e.preventDefault()
    $(e.target).trigger('mouseover')
    touchCountHere++
  }

  function handleTwoTouchesHere(e) {
    $(e.target).click()
  }

  $('#work').on( {

    'touchstart': function (e) {
      // e.preventDefault()
      switch (touchCountHere) {
        case 1: handleOneTouchHere(e); break;
        case 2: handleTwoTouchesHere(e); break;
        default: console.log('not supported'); break;
      }
    },

    'mouseover': function (e) {
      e.preventDefault()
      e.stopPropagation()
      $('#landing').addClass('z2')
      $('h1 span.current.z2').removeClass('current z2')
      $('.card')
        .addClass('current z1')
        .children().addClass('all-gray')
        .children().addClass('hidden')
    },

    'mouseout': function (e) {
      e.preventDefault()
      e.stopPropagation()
      $('#landing').removeClass('z2')
      $('.card')
        .removeClass('current z1')
        .children().removeClass('all-gray')
        .children().removeClass('hidden')
    }
  })

  //
  // GRID EVENTS
  //

  var cat, button, opaque, faded
  var touchCountGrid = 1
  var targetGridCard

  function handleOneTouchGridCards(e) {
    e.preventDefault()
    if ((targetCard || $(e.currentTarget).hasClass('current')) && (targetCard !== e.currentTarget)) {
      $(targetCard).trigger('mouseout')
      targetCard = e.currentTarget
      $(targetCard).trigger('mouseover')
    } else {
      targetCard = e.currentTarget
      $(targetCard).trigger('mouseover')
    }
    touchCountGrid++
  }

  function handleTwoTouchesGridCards(e) {
    if (e.currentTarget === targetCard || $(e.currentTarget).hasClass('active')) {
      $(targetCard).trigger('click')
      targetCard = undefined
      touchCountGrid--
    } else {
      e.preventDefault()
      $(targetCard).trigger('mouseout')
      targetCard = e.currentTarget
      $(targetCard).trigger('mouseover')
    }
  }

  $('#main').on( {

    'touchstart': function (e) {
      switch (touchCountGrid) {
        case 1: handleOneTouchGridCards(e); break;
        case 2: handleTwoTouchesGridCards(e); break;
        default: console.log('not supported'); break;
      }
    },

    'mouseover': function(e) {
      e.preventDefault()
      e.stopPropagation()
      cat = $(this).attr('class').split(' ').shift()
      opaque = $('#grid').find('.' + cat + '').not(this).addClass('current z1')
      faded = $('#grid').find('.card').not('.' + cat + '').find('.card-content').addClass('faded')
      button = $('#landing').find('span.' + cat + '').addClass('current z2')
    },

    'mouseout': function (e) {
      e.preventDefault()
      e.stopPropagation()
      faded.removeClass('faded')
      opaque.removeClass('current z1')
      button.removeClass('current z2')
    },

    'click': function (e) {

    }
  }, '#grid.active .card')

  //
  // CARDS view
  //

  var touchCountCards = 1
  var targetCard

  function handleOneTouchCards(e) {
    if (targetCard && (targetCard !== e.target)) {
      $(targetCard).trigger('mouseout')
      targetCard = e.target
      $(targetCard).trigger('mouseover')
    } else {
      targetCard = e.target
      $(targetCard).trigger('mouseover')
    }
    touchCountCards++
  }

  function handleTwoTouchesCards(e) {
    if (e.target === targetCard) {
      $(targetCard).trigger('click')
      targetCard = undefined
      touchCountCards--
    } else {
      $(targetCard).trigger('mouseout')
      targetCard = e.target
      $(targetCard).trigger('mouseover')
    }
  }

  $('#grid').on( {

    'touchstart': function (e) {
      e.preventDefault()
      switch (touchCountCards) {
        case 1: handleOneTouchCards(e); break;
        case 2: handleTwoTouchesCards(e); break;
        default: console.log('not supported'); break;
      }
    },

    'mouseover': function (e) {
      $(this).find('img').css('opacity', 1)
    },

    'mouseout': function (e) {
      $(this).find('img').removeAttr('style')
    }
  }, '.card.active')

  $('#landing').on( {
    'click': function (e) {
      e.preventDefault()
    }
  }, 'a.active')
})
