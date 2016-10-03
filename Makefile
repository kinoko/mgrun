all: image

./app/mgrun.tar.gz:
	cd ./mgrun && meteor build --architecture os.linux.x86_64 ../app && cd ..

image: ./app/mgrun.tar.gz
	docker build --rm -t kinoko/mgrun .

clean:
	rm ./app/mgrun.tar.gz
