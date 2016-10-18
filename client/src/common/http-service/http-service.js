var mod = angular.module('yanda.common.http-service', [
]);

mod.factory('httpService', ['$http', httpService]);

function httpService($http) {
	var url = "http://localhost:1337/";

	//CREATE
	function create(relativUrl, data) {
		return $http({
			accept: "application/json",
			method: "POST",
			url: url + relativUrl,
			data: data
		});
	}

	//READ
	function getAll(relativUrl, cache, page, count) {
		var getUrl = url + relativUrl;

		return $http({
			cache: cache,
			accept: "application/json",
			method: "GET",
			url: getUrl
		});
	}

	function get(relativUrl) {
		return $http({
			accept: "application/json",
			method: "GET",
			url: url + relativUrl
		});
	}

	//UPDATE
	function update(relativUrl, data) {
		return $http({
			accept: "application/json",
			method: "PUT",
			url: url + relativUrl,
			data: data
		});
	}

	//DELETE
	function deleteElement(relativUrl) {
		return $http({
			accept: "application/json",
			method: "DELETE",
			url: url + relativUrl
		});
	}

	return {
		create : create,
		get : get,
		getAll : getAll,
		update: update,
		deleteElement : deleteElement
	};
}