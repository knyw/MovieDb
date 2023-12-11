/**
 * Created on October 28, 2019
 * @author Kenny Wu
 */

//Initialize ng-app Directive
var app = angular.module("moviesDB", ["ngRoute"]);
app.filter("mmTOhhmm", function () {
    return function (minutes) {
        var seconds = minutes * 60;
        var hours = Math.floor(seconds / 3600) % 24;
        seconds -= hours * 3600;
        var minutes = Math.floor(seconds / 60) % 60;
        return hours + " hr " + minutes + " min";
    };
});

// Replace image links for Glitch.com
app.run(function ($rootScope) {
    $rootScope.baseLink = "source/";
    //$rootScope.baseLink = "https://cdn.glitch.com/fb8d2a25-7d80-46fb-9415-f9eced90ba9a%2F";
});

// Global shared data stored in custom Service
app.service("sharedData", function () {
    return {
        data: {
            overlay: "none"
        },
        updateItem: function (x, y) {
            this.data[x] = y;
        },
        addItem: function (x, y) {
            this.data[x] = y;
        }
    }
});

// Custom function with Service
app.service('myFunctions', function() {
    this.sortUnique = function (x) {
        var final = x.filter(function (value, index, self) { 
            return self.indexOf(value) === index;
        });
        final.sort().reverse();
        return final;
    }
});
  
// Head control Controller 
app.controller("headControl", function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    }
});

// Initialize ngRoute Routing module
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "trending.html"
        })
        .when("/nowplaying", {
            templateUrl: "nowplaying.html"
        })
        .when("/upcoming", {
            templateUrl: "upcoming.html"
        })
        .when("/toprated", {
            templateUrl: "toprated.html"
        })
        .when("/id/:movieId", {
            templateUrl: "moviepage.html",
            controller: "moviePage"
        });
});

// Initialize trending movies with Controller
app.controller("trendingMovies", function ($scope, $http, sharedData) {
    $scope.imageBaseURL = "https://image.tmdb.org/t/p/w500";
    $http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=05d9457a6c3f27633170949ca93ff619&page=1")
        .then(function (response) {
            $scope.movies = response.data.results;
        });
    $http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=05d9457a6c3f27633170949ca93ff619&page=2")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=05d9457a6c3f27633170949ca93ff619&page=3")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=05d9457a6c3f27633170949ca93ff619&page=4")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=05d9457a6c3f27633170949ca93ff619&page=5")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=05d9457a6c3f27633170949ca93ff619&page=6")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
            sharedData.updateItem("currentMovieList", $scope.movies);
        });
    $scope.playTrailer = function (x) {
        $http.get("https://api.themoviedb.org/3/movie/" + x + "/videos?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US")
            .then(function (response) {
                $scope.key = response.data.results[0].key;
                sharedData.updateItem("overlay", "block");
                sharedData.updateItem("movieKey", response.data.results[0].key);
        });
    };
});

// Initialize now playing movies with Controller
app.controller("nowPlayingMovies", function ($scope, $http, sharedData) {
    $scope.imageBaseURL = "https://image.tmdb.org/t/p/w500"
    $http.get("https://api.themoviedb.org/3/movie/now_playing?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=1&region=US")
        .then(function (response) {
            $scope.movies = response.data.results;
        });
    $http.get("https://api.themoviedb.org/3/movie/now_playing?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=2&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/now_playing?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=3&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/now_playing?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=4&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/now_playing?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=5&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/now_playing?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=6&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
            sharedData.updateItem("currentMovieList", $scope.movies);
        });
    $scope.playTrailer = function (x) {
        $http.get("https://api.themoviedb.org/3/movie/" + x + "/videos?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US")
            .then(function (response) {
                $scope.key = response.data.results[0].key;
                sharedData.updateItem("overlay", "block");
                sharedData.updateItem("movieKey", response.data.results[0].key);
        });
    };
});

// Initialize upcoming movies with Controller
app.controller("upcomingMovies", function ($scope, $http, sharedData) {
    $scope.imageBaseURL = "https://image.tmdb.org/t/p/w500";
    $http.get("https://api.themoviedb.org/3/movie/upcoming?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=1&region=US")
        .then(function (response) {
            $scope.movies = response.data.results;
        });
    $http.get("https://api.themoviedb.org/3/movie/upcoming?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=2&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/upcoming?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=3&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/upcoming?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=4&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/upcoming?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=5&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/upcoming?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=6&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
            sharedData.updateItem("currentMovieList", $scope.movies);
        });
    $scope.playTrailer = function (x) {
        $http.get("https://api.themoviedb.org/3/movie/" + x + "/videos?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US")
            .then(function (response) {
                $scope.key = response.data.results[0].key;
                sharedData.updateItem("overlay", "block");
                sharedData.updateItem("movieKey", response.data.results[0].key);
        });
    };
});

// Initialize top rated movies with Controller
app.controller("topRatedMovies", function ($scope, $http, sharedData) {
    $scope.imageBaseURL = "https://image.tmdb.org/t/p/w500"
    $http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=1&region=US")
        .then(function (response) {
            $scope.movies = response.data.results;
        });
    $http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=2&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=3&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=4&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=5&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
        });
    $http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=6&region=US")
        .then(function (response) {
            $scope.movies = $scope.movies.concat(response.data.results);
            sharedData.updateItem("currentMovieList", $scope.movies);
        });
    $scope.playTrailer = function (x) {
        $http.get("https://api.themoviedb.org/3/movie/" + x + "/videos?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US")
            .then(function (response) {
                $scope.key = response.data.results[0].key;
                sharedData.updateItem("overlay", "block");
                sharedData.updateItem("movieKey", response.data.results[0].key);
        });
    };
});

// Initialize filter and order by with Controller
app.controller("filterOrderBy", function ($rootScope, $scope, sharedData, myFunctions, $http) {
    $scope.sharedData = sharedData.data;
    $scope.orderBy = { "Title": "title", "Year": "release_date.substring(0, 4)", "Release Date": "release_date", "Rating": "vote_average" };
    $scope.filterBy = { "Year": "", "Decade": "", "Genre": "" };
    $rootScope.filterByThis = undefined;
    $rootScope.filterByThisName = undefined;
    $scope.orderByThisName = "None";
    $scope.changeFilterName = function (x) {
        $scope.filterByThisName = x;
    }
    $scope.changeOrderName = function (x) {
        $scope.orderByThisName = x
    }
    $scope.filterTop = true;
    $scope.filterYear = false;
    $scope.filterDecade = false;
    $scope.filterGenre = false;
    $scope.showFilterBy = function (x) {
        $scope.movieList = $scope.sharedData.currentMovieList;
        if (x == "Year") {
            var years = [];
            for (var i = 0; i < $scope.movieList.length; i++) {
                for (var key in $scope.movieList[i]) {
                    if (key == "release_date") {
                        years.push($scope.movieList[i][key].split("-")[0]);
                    }
                }
            }
            $scope.filterByYear = myFunctions.sortUnique(years)
            $scope.filterTop = false;
            $scope.filterYear = true;
        } else if (x == "Decade") {
            var decades = [];
            for (var i = 0; i < $scope.movieList.length; i++) {
                for (var key in $scope.movieList[i]) {
                    if (key == "release_date") {
                        decades.push($scope.movieList[i][key].split("-")[0].substring(0, 2));
                    }
                }
            }
            $scope.filterByDecade = myFunctions.sortUnique(decades)
            $scope.filterTop = false;
            $scope.filterDecade = true;
        } else if (x == "Genre") {
            var genres = [];
            var genreNames = [];
            for (var i = 0; i < $scope.movieList.length; i++) {
                for (var key in $scope.movieList[i]) {
                    if (key == "genre_ids") {
                        for (var idx = 0; idx < $scope.movieList[i][key].length; idx++) {
                            genres.push($scope.movieList[i][key][idx]);
                        }
                    }
                }
            }
            var filteredGenres = myFunctions.sortUnique(genres)
            $http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US")
                .then(function (response) {
                    $scope.genreList = response.data.genres;
                    //sharedData.updateItem("currentMovieList", $scope.movies);
                    for (var i = 0; i < filteredGenres.length; i++) {
                        for (var idx = 0; idx < $scope.genreList.length; idx++) {
                            if (filteredGenres[i] == $scope.genreList[idx].id) {
                                genreNames.push($scope.genreList[idx].name);
                            }
                        }
                    }
                    $scope.filterByGenre = genreNames.sort();
                });
            $scope.filterTop = false;
            $scope.filterGenre = true;
        }
    };
    $scope.showFilterByTop = function () {
        $scope.filterTop = true;
        $scope.filterYear = false;
        $scope.filterDecade = false;
        $scope.filterGenre = false;
    }
});

// Initialize single movie page with Controller
app.controller("moviePage", function ($scope, $http, $routeParams, sharedData) {
    $scope.imageBaseURL = "https://image.tmdb.org/t/p/w500";
    $scope.movieId = $routeParams.movieId;
    $http.get("https://api.themoviedb.org/3/movie/" + $scope.movieId + "?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&append_to_response=credits")
    .then(function (response) {
        $scope.movieInfo = response.data;
    });
    $scope.getDirector = function (x) {
        var crews = x.crew;
        var directors = "";
        var count = 0;
        for (var i = 0; i < crews.length; i++) {
            if (crews[i].department == "Directing" && crews[i].job == "Director") {
                if (count == 0) {
                    directors = directors.concat(crews[i].name);
                } else {
                    directors = directors.concat(", " + crews[i].name);
                }
                if (count == 4) {
                    directors = directors.concat("...");
                    break;
                }
                count++;
            }
        }
        return directors;
    };
    $scope.getWriter = function (x) {
        var crews = x.crew;
        var writers = "";
        var count = 0;
        for (var i = 0; i < crews.length; i++) {
            if (crews[i].department == "Writing" && crews[i].job == "Screenplay") {
                if (count == 0) {
                    writers = writers.concat(crews[i].name);
                } else {
                    writers = writers.concat(", " + crews[i].name);
                }
                if (count == 4) {
                    writers = writers.concat("...");
                    break;
                }
                count++;
            }
        }
        return writers;
    };
    $scope.getStudio = function (x) {
        var studios = "";
        for (var i = 0; i < x.length; i++) {
            if (i == 0) {
                studios = studios.concat(x[i].name);
            } else {
                studios = studios.concat(", " + x[i].name);
            }
            if (i == 4) {
                studios = studios.concat("...");
                break;
            }
        }
        return studios;
    };
    $scope.getGenre = function (x) {
        var genres = "";
        for (var i = 0; i < x.length; i++) {
            if (i == 0) {
                genres = genres.concat(x[i].name);
            } else {
                genres = genres.concat(", " + x[i].name);
            }
            if (i == 4) {
                genres = genres.concat("...");
                break;
            }
        }
        return genres;
    };
    $scope.playTrailer = function () {
        $http.get("https://api.themoviedb.org/3/movie/" + $scope.movieId + "/videos?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US")
            .then(function (response) {
                $scope.key = response.data.results[0].key;
                sharedData.updateItem("overlay", "block");
                sharedData.updateItem("movieKey", response.data.results[0].key);
        });
    };
    $http.get("https://api.themoviedb.org/3/movie/" + $scope.movieId + "/reviews?api_key=05d9457a6c3f27633170949ca93ff619&language=en-US&page=1")
        .then(function (response) {
            $scope.reviews = response.data.results;
        });
    
});

// Initialize trailer overlay with Controller
app.controller("showTrailer", function ($scope, sharedData, $sce) {
    $scope.sharedData = sharedData.data;
    $scope.trustSource = function (url) {
        $scope.trailerUrl = "https://www.youtube.com/embed/" + $scope.sharedData.movieKey + "?autoplay=1";
        return $sce.trustAsResourceUrl(url);
    }
    $scope.stopPlay = function () {
        $scope.sharedData.movieKey = "";
    }
});
