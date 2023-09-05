$(document).ready(() => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const twoDigits = (num) => num.toString().padStart(2, '0');
    tomorrow = `${tomorrow.getFullYear()}-${twoDigits(tomorrow.getMonth() + 1)}-${twoDigits(tomorrow.getDate())}`;
  
    $.ajax({
      url: `https://api.tvmaze.com/schedule?country=US&date=${tomorrow}`,
      type: 'GET',
      dataType: 'json'
    }).done((data, status, xhr) => {
      const filtered = data.filter(episode => episode.show.image !== null);
      const tomorrowSchedule = filtered.slice(0, 24);
      $.each(tomorrowSchedule, (index, episode) => {
        const eachImage = $('<img></img>').attr('src', episode.show.image.medium).addClass('responsive-image');
        $('.schedule-bar').append(eachImage);
      });
    })
  
    $('.schedule-bar').on('scroll', (event) => {
      const $scheduleBar = $(event.target);
      const maxScrollLeft = event.target.scrollWidth - $scheduleBar.width();
      if ($scheduleBar.scrollLeft() + 0.5 >= maxScrollLeft) {
        $scheduleBar.removeClass('transparent-mask');
      } else {
        $scheduleBar.addClass('transparent-mask');
      }
    });
  })
  