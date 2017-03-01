angular.module("app", ["ngAnimate"])
angular.module("app").controller("controller", controller)

controller.$inject = ["$scope"]

function controller($scope){
	const vm = this

	vm.user = ""
	vm.users = []
	vm.weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	vm.validateUser = validateUser
	vm.addUser = addUser
	vm.deleteUser = deleteUser
	vm.generateList = generateList

	clearList()

	function validateUser(){
		vm.invalid_user = invalidUser()
	}

	function addUser(){
		if(invalidUser()) return
		vm.users.push(vm.user)
		vm.user = ""
	}

	function deleteUser(user){
		vm.users = vm.users.filter(function(u){ return !(u == user) })
		// vm.users = vm.users.filter(u => u != user)
	}

	function invalidUser(){ return vm.user == "" || hasUser(vm.user) }

	function hasUser(comparator){
		return vm.users.indexOf(comparator) > -1
	}

	function generateList(){
		clearList()
		if(vm.users.length == 0) return
		// shuffle users
		var shuffled = shuffle(vm.users).slice(0, 10)
		// while users are less than 10, repeat users
		if(shuffled.length < 10){
			var t = [], i = 0
			angular.copy(shuffled, t)
			while(shuffled.length < 10){
				shuffled.push(t[i++])
				if(i == t.length) i = 0
			}
		}
		// generate list according to shuffled users
		$.each(shuffled, function(order, user){ vm.list[Math.floor(order % 2)].push(user) })
		vm.show_list = true
	}

	function clearList(){
		vm.list = [[], []]
		vm.show_list = false
	}

	function shuffle(array) {
		var m = array.length, t, i, a = [];
		angular.copy(array, a)
		while (m) {
			i = Math.floor(Math.random() * m--);
			t = a[m];
			a[m] = a[i];
			a[i] = t;
		}
		return a;
	}

}