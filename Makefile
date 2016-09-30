all: image

./app/mgrun.tar.gz:
	meteor build --architecture os.linux.x86_64 ./app

image: ./app/mgrun.tar.gz
	docker build --rm -t kinoko/gitlab-managed-runner .

clean:
	rm ./app/mgrun.tar.gz
