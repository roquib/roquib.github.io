#include <stdio.h>
#include <unistd.h>
void LCDstring(__uint8_t *a,__uint8_t size) {
  __uint8_t i;
  for(i =0;i<size;i++) {
    printf("%c",a[i]);
  }
}
int main() {
  char clock[10];int i,j,k;
  for(i=0;i<=12;i++) {
    for(j=0;j<60;j++) {
      for(k=0;k<60;k++) {
        if(k<10) {
          clock[0] = k/10;
          clock[1] = k%10;
        }else {
          clock[0] = k/10;
          clock[1] = k%10;
        }
        if(j<10) {
          clock[2] = j/10;
          clock[3] = j%10;
        }else {
          clock[2] = j/10;
          clock[3] = j%10;
        }
        if(i<10) {
          clock[4] = i/10;
          clock[5] = i%10;
        }else {
          clock[4] = i/10;
          clock[5] = i%10;
        }

  printf("%d%d:%d%d:%d%d\n",clock[4],clock[5],clock[2],clock[3],clock[0],clock[1]);
  sleep(1);
      }
    }
  }
}
