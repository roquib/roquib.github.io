---
layout: page
mathjax: true
title: Algorithm Spring semester Code
permalink: /courses/spring2018/code/
---

<a name="insertion_sort"></a>

#### Insertion Sort in c++

```cpp

// Insertion sort in c++
#include <iostream>
using namespace std;
// define some macro to printing the elements
#define puts(x) cout << x << endl;
#define print(x) cout << x << " ";
//#define p(x) for(auto i : x) print(x)
#define Print(x,size) for(int i = 0;i<size;i++) print(x[i]) ;cout << endl;
#define Puts(x,y)  cout << x << " " << y << " array "<<endl;
template< typename t,size_t  n> inline
void insertion_sort(int arr[], int n)
{
   int i, key, j;
   for (i = 1; i < n; i++)
   {
       key = arr[i];
       j = i-1;
       while (j >= 0 && arr[j] > key)
       {
           arr[j+1] = arr[j];
           j = j-1;
       }
       arr[j+1] = key;
   }
}
int main() {
    int A[] = {9,2,3,0,8,1};
    Puts("insertion sort","unsorted");
    Print(A,size(A));
    //Insertion sort
    //another tricks to find size of dynamic array
    //int n = sizeof(A)/sizeof(A[0]);
    int n = size(A);
    insertion_sort(A,size(A));
    Puts("Insertion Sort","sorted");
    Print(A,n);
}
/*
Output:
insertion sort unsorted array 
9 2 3 0 8 1 
Insertion Sort sorted array 
0 1 2 3 8 9 
*/
```

<a name="selection_sort"></a>

#### Selection Sort in c++

```cpp
// Selection sort in c++
#include <iostream>
using namespace std;
// define some macro to printing the elements
#define puts(x) cout << x << endl;
#define print(x) cout << x << " ";
//#define p(x) for(auto i : x) print(x)
#define Print(x,size) for(int i = 0;i<size;i++) print(x[i]) ;cout << endl;
#define Puts(x,y)  cout << x << " " << y << " array "<<endl;
template< typename t,size_t  n> inline
void swap(int *x, int *y)
{
    int temp = *x;
    *x = *y;
    *y = temp;
}
void selection_sort(int arr[], int n)
{
    int i, j, min_idx;
    for (i = 0; i < n-1; i++)
    {
        min_idx = i;
        for (j = i+1; j < n; j++)
          if (arr[j] < arr[min_idx])
            min_idx = j;
        swap(&arr[min_idx], &arr[i]);
    }
}

int main() {
    int B[] = {9,2,4,0,8,1};
    Puts("Selection Sort","unsorted");
    int p = size(B);
    Print(B,p);
    selection_sort(B,p);
    Puts("Selection Sort","sorted");
    Print(B,p);
}
/*
Output: 
Selection Sort unsorted array 
9 2 4 0 8 1 
Selection Sort sorted array 
0 1 2 4 8 9 
/
```