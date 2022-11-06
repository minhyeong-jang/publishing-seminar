var pageNum = 0;
var oldNum = 0;
var matNum = 0;
var imgNum = 0;
var oldVisual = 0;
var visualNum = 1;
var vNaviNum = 1;
var vNaviOld = 0;
var n32Visual;
var nowCol = 0;
var oldCol = 0;
var matSubLi;
var matSubSpan;
var lightArray = [0, 4, 4, 1, 1, 2, 2, 3, 3, 4];
var lightLeng = lightArray.length;
var allOff = [4, 1, 2, 6, 3, 5, 0];
var allOffArr = allOff.length;
var lightOff = [4, 3, 3, 2, 2, 1, 1, 4, 4, 0];
var lightOffArr = lightOff.length;
var lightImg = 0;
var offLi = 0;
var offImg = 0;
var objLength;
var wheelCount = 0;
var video = document.getElementById("video");
var isNext = true;
var isMobile = false;
var isMobileDevice = false;
if (
  /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
) {
  isMobileDevice = true;
}
if ($(window).width() < 481) isMobile = true;
var navU = navigator.userAgent;

// Android Mobile
var isAndroidMobile =
  navU.indexOf("Android") > -1 &&
  navU.indexOf("Mozilla/5.0") > -1 &&
  navU.indexOf("AppleWebKit") > -1;
//console.log(isAndroid);
//if(isMobile) launchIntoFullscreen(document.documentElement);

$(function () {
  NProgress.start();
  $(window).on("resize", function () {
    if (!isMobileDevice) {
      location.reload();
      gnbMove(0);
    }
  });
  if (isMobile) {
    $(".page").addClass("active");
    $(".page.first").css({ height: $(window).outerHeight() });
    // $(window).on('scroll',function(){
    // if($('.page').css('height')!=$(window).outerHeight())
    // $('.page').css({height:$(window).outerHeight()});
    // });
    $(".page.seventh .top .wrap_btn_round_white").click(function (e) {
      e.preventDefault();
      $(this).closest(".top").fadeOut("fast");
    });
  }
  $(".list_ico").css({
    marginLeft: ((($(".list_ico li").outerWidth() + 30) * 5) / 2) * -1,
  });

  if (!isMobile) {
    $(".page").find(".cycle-slideshow").cycle("pause");
  }
  $(window).on("load", function () {
    NProgress.done();

    if (!isMobile) {
      $(".page").eq(0).find(".cycle-slideshow").cycle("resume");
      $("#content .page").eq(pageNum).addClass("active");
    } else {
    }
    $(".page.second .cycle-slideshow,.page.first .cycle-slideshow").on(
      "cycle-before",
      function (
        event,
        optionHash,
        outgoingSlideEl,
        incomingSlideEl,
        forwardFlag
      ) {
        $(incomingSlideEl).prev().addClass("prev");
      }
    );
    $(".page.second .cycle-slideshow,.page.first .cycle-slideshow").on(
      "cycle-after",
      function (
        event,
        optionHash,
        outgoingSlideEl,
        incomingSlideEl,
        forwardFlag
      ) {
        $(".page.second .bg, .page.first .bg").removeClass("prev");
      }
    );
  });
  $("form input,form textarea").focus(function () {
    $(this).after(
      "<div class='foucs_bullet' style='width:2px;height:8px;background:#b1986a;position:absolute;left:" +
        $(this).position().left +
        "px;top:" +
        ($(this).position().top + $(this).outerHeight() - 8) +
        "px'></div>"
    );
    $(this).after(
      "<div class='foucs_bullet' style='width:2px;height:8px;background:#b1986a;position:absolute;left:" +
        ($(this).position().left + $(this).outerWidth() - 2) +
        "px;top:" +
        ($(this).position().top + $(this).outerHeight() - 8) +
        "px'></div>"
    );
  });
  $("form input,form textarea").blur(function () {
    $(".foucs_bullet").remove();
  });

  //파일첨부 선택
  var $file = $("#file");
  var $input = $("#filename");
  $(".file-select").on("click", function () {
    //	$(this).find('#file').focus().click();
  });
  var multipleSupport = typeof $("<input/>")[0].multiple !== "undefined",
    isIE = /msie/i.test(navigator.userAgent);
  $file.change(function () {
    var files = [],
      fileArr,
      filename;

    // If multiple is supported then extract
    // all filenames from the file array
    if (multipleSupport) {
      fileArr = $file[0].files;
      for (var i = 0, len = fileArr.length; i < len; i++) {
        files.push(fileArr[i].name);
      }
      filename = files.join(", ");

      // If not supported then just take the value
      // and remove the path to just show the filename
    } else {
      filename = $file.val().split("\\").pop();
    }

    $input
      .val(filename) // Set the value
      .attr("title", filename) // Show filename in title tootlip
      .focus(); // Regain focus
  });

  //개인정보 수집동의 체크
  $(".agree-check").on("click", function () {
    $(this)
      .find("input")
      .prop("checked", !$(this).find("input").prop("checked"));
    $(this).toggleClass("on");
  });
  // 모든 좌측 슬라이드 swipe 작업
  $(".cycle-slideshow,.page.first .wrap_txt").on("swipeleft", function () {
    console.log("swipeLeft");
    $(this).closest(".page").find(".cycle-slideshow").cycle("next");
  });
  $(".cycle-slideshow, .page.first .wrap_txt").on("swiperight", function () {
    console.log("swipeRight");
    $(this).closest(".page").find(".cycle-slideshow").cycle("prev");
  });

  //section02 페이징버튼 연결
  $(".page.second .pager span").mouseover(function () {
    var _index = $(this).index();
    //console.log(_index);
    $(".page.second .cycle-slideshow").cycle("goto", _index);
  });

  //메뉴버튼
  $("#nav-icon").click(function () {
    if (!$("#content .page").is(":animated")) {
      $(this).toggleClass("open");
      if ($(this).hasClass("open")) {
        $("#pop_menu").fadeIn(500).addClass("open");
        $(".page").find(".cycle-slideshow").cycle("pause");
      } else {
        $("#pop_menu").fadeOut(500).removeClass("open");
        $(".page").eq(0).find(".cycle-slideshow").cycle("resume");
      }
    } else {
      return;
    }
  });
  $("#pop_menu a").click(function () {
    if (!$("#content .page").is(":animated")) {
      $("#pop_menu").fadeOut(1000);
      $("#pop_menu li a").removeClass("on");
      $(this).addClass("on");
      $("#nav-icon").toggleClass("open");
    } else {
      return;
    }
  });

  //console.log($(window).innerWidth(), $(window).innerHeight())
  var colNum = $(".collection > ul > li").length - 1;
  section01(); // visual animation function

  objLength = $("#content .page").length - 1;
  if (!isMobile) {
    //mobile swipe event
    $("body,html").on("swipeup", function () {
      if (!$("#content .page").is(":animated")) {
        if (pageNum < objLength) {
          pageNum++;
          scrollBottom(pageNum);
        } else {
          return;
        }
      } else {
        return;
      }
    });
    $("body,html").on("swipedown", function () {
      if (!$("#content .page").is(":animated")) {
        if (pageNum > 0) {
          pageNum--;
          scrollTop(pageNum);
        } else {
          return;
        }
      } else {
        return;
      }
    });

    // mouse wheel event
    $("body,html").on("mousewheel", function (e) {
      wheelCount = e.deltaY;
      if (!$("#content .page").is(":animated")) {
        //console.log(pageNum);
        if (wheelCount == 1) {
          if (pageNum > 0) {
            pageNum--;
            scrollTop(pageNum);
          } else {
            return;
          }
        } else if (wheelCount == -1) {
          if (pageNum < objLength) {
            pageNum++;
            scrollBottom(pageNum);
          } else {
            return;
          }
        } else {
          return;
        }
      } else {
        return;
      }
    });
  }
});

function scrollTop(pageNum) {
  sectionAniBefore(pageNum);
  //'easeInQuint'
  $("#content .page")
    .eq(pageNum)
    .animate({ top: "0%" }, 1000, function () {
      oldTop(pageNum);
      sectionAni(pageNum);
    });
  $("#content .page")
    .eq(oldNum)
    .animate({ top: "100%" }, 1000, function () {});
}

function scrollBottom(pageNum) {
  sectionAniBefore(pageNum);

  $("#content .page")
    .eq(pageNum)
    .animate({ top: "0%" }, 1000, function () {
      oldBottom(pageNum);
      sectionAni(pageNum);
    });
  $("#content .page")
    .eq(oldNum)
    .animate({ top: "-100%" }, 1000, function () {});
}

function sectionAniBefore(pageNum) {
  var pageTop = $("#nav span").eq(pageNum).position().top;
  setTimeout(function () {
    $("#nav span").not(pageNum).removeClass("hide");
    $("#nav span").eq(pageNum).addClass("hide");
  }, 500);
  $("#nav .on").animate({ top: pageTop }, 1000);
  pageActive();
}

// section animation
function sectionAni(pageNum) {
  var color = ["#ffffff", "#000000", "#ffffff"];

  $("#pop_menu").fadeOut(1000);
  $("#nav-icon").removeClass("open");
  $("#pop_menu li a").removeClass("on");
  if (pageNum - 1 > -1) {
    $("#pop_menu li")
      .eq(pageNum - 1)
      .find("a")
      .addClass("on");
  }
  $("#content .page").each(function (index) {
    if (pageNum != index && oldNum != index) {
      if (index < pageNum) {
        $(this).css({ top: "-100%" });
      } else {
        $(this).css({ top: "100%" });
      }
    }
  });

  $("#nav-icon span").css("background", color[pageNum]);
  $(".page").not(pageNum).find(".cycle-slideshow").cycle("pause");
  $(".page").eq(pageNum).find(".cycle-slideshow").cycle("resume");

  switch (pageNum) {
    case 0:
      setTimeout(function () {
        section01();
      }, 0);

      break;
    case 1:
      setTimeout(function () {
        section02();
      }, 0);
      break;
    case 2:
      setTimeout(function () {
        section03();
      }, 0);

      break;
  }
}

function section01() {}

function section02() {}

function section03() {}

function oldTop(wheelNum) {
  if (wheelNum != pageNum) {
    for (i = pageNum; i < oldNum; i++) {
      $("#content .page").eq(i).css("top", "100%");
    }
  }
  oldNum = pageNum;

  //pageActive();
  //console.log("oldTop function ==> oldNum :" + oldNum);
}

function oldBottom(wheelNum) {
  for (i = oldNum + 1; i < pageNum; i++) {
    $("#content .page").eq(i).css("top", "-100%");
  }
  oldNum = pageNum;
  //pageActive();
  //console.log("oldBottom function ==> oldNum :" + oldNum);
}
function pageActive() {
  setTimeout(function () {
    var $cur_page = $("#content .page").eq(pageNum);
    $("#content .page").not($cur_page).removeClass("active");
    $("#content .page").eq(pageNum).addClass("active");
  }, 500);
}
function gnbMove(linkNum) {
  if (!isMobile) {
    //console.log("linkNum:"+linkNum +"  oldNum:"+oldNum + "  pageNum:"+pageNum );
    if (!$("#content .page").is(":animated")) {
      pageNum = linkNum;
      if (oldNum < pageNum) {
        scrollBottom(pageNum);
      } else if (oldNum > pageNum) {
        scrollTop(pageNum);
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    var body = $("html, body");
    var top_pos = $(".page").eq(linkNum).offset().top;
    var speed = 500 * Number(linkNum);
    body
      .stop()
      .animate({ scrollTop: top_pos }, "slow", "linear", function () {});
  }
}
function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Launch fullscreen for browsers that support it!
// the whole page

/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }
})(this, function () {
  var NProgress = {};

  NProgress.version = "0.2.0";

  var Settings = (NProgress.settings = {
    minimum: 0.08,
    easing: "ease",
    positionUsing: "",
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: "body",
    template:
      '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
  });

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function (options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key))
        Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function (n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = n === 1 ? null : n;

    var progress = NProgress.render(!started),
      bar = progress.querySelector(Settings.barSelector),
      speed = Settings.speed,
      ease = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function (next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === "")
        Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: "none",
          opacity: 1,
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function () {
          css(progress, {
            transition: "all " + speed + "ms linear",
            opacity: 0,
          });
          setTimeout(function () {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function () {
    return typeof NProgress.status === "number";
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function () {
    if (!NProgress.status) NProgress.set(0);

    var work = function () {
      setTimeout(function () {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function (force) {
    if (!force && !NProgress.status) return this;
    $("body").removeClass("loading");
    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function (amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== "number") {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function () {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function () {
    var initial = 0,
      current = 0;

    NProgress.promise = function ($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function () {
        current--;
        if (current === 0) {
          initial = 0;
          NProgress.done();
        } else {
          NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };
  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function (fromStart) {
    if (NProgress.isRendered()) return document.getElementById("nprogress");

    addClass(document.documentElement, "nprogress-busy");

    var progress = document.createElement("div");
    progress.id = "nprogress";
    progress.innerHTML = Settings.template;

    var bar = progress.querySelector(Settings.barSelector),
      perc = fromStart ? "-100" : toBarPerc(NProgress.status || 0),
      parent = document.querySelector(Settings.parent),
      spinner;

    css(bar, {
      transition: "all 0 linear",
      transform: "translate3d(" + perc + "%,0,0)",
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, "nprogress-custom-parent");
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function () {
    removeClass(document.documentElement, "nprogress-busy");
    removeClass(
      document.querySelector(Settings.parent),
      "nprogress-custom-parent"
    );
    var progress = document.getElementById("nprogress");
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function () {
    return !!document.getElementById("nprogress");
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function () {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix =
      "WebkitTransform" in bodyStyle
        ? "Webkit"
        : "MozTransform" in bodyStyle
        ? "Moz"
        : "msTransform" in bodyStyle
        ? "ms"
        : "OTransform" in bodyStyle
        ? "O"
        : "";

    if (vendorPrefix + "Perspective" in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return "translate3d";
    } else if (vendorPrefix + "Transform" in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return "translate";
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return "margin";
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }

  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === "translate3d") {
      barCSS = { transform: "translate3d(" + toBarPerc(n) + "%,0,0)" };
    } else if (Settings.positionUsing === "translate") {
      barCSS = { transform: "translate(" + toBarPerc(n) + "%,0)" };
    } else {
      barCSS = { "margin-left": toBarPerc(n) + "%" };
    }

    barCSS.transition = "all " + speed + "ms " + ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function () {
    var pending = [];

    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function (fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function () {
    var cssPrefixes = ["Webkit", "O", "Moz", "ms"],
      cssProps = {};

    function camelCase(string) {
      return string
        .replace(/^-ms-/, "ms-")
        .replace(/-([\da-z])/gi, function (match, letter) {
          return letter.toUpperCase();
        });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
        capName = name.charAt(0).toUpperCase() + name.slice(1),
        vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function (element, properties) {
      var args = arguments,
        prop,
        value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop))
            applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    };
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == "string" ? element : classList(element);
    return list.indexOf(" " + name + " ") >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
      newList = oldList + name;

    if (hasClass(oldList, name)) return;

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
      newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(" " + name + " ", " ");

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element.
   * The list is wrapped with a single space on each end to facilitate finding
   * matches within the list.
   */

  function classList(element) {
    return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});
