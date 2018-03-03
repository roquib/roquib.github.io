---
layout: page
mathjax: true
title: Algorithm Spring semester
permalink: /courses/spring2018/algorithm/
---

Table of contents: 

- [Algorithm](#introduction)
- [Characteristics](#characteristics)
- [Need for analysis of algorithm](#analysis)
- [Design strategis](#strategies)
- [Pros and Cons of divide and conquer](#prosAndCons)
- [Application of Divide and Conquer Approach](#divide)
- [Data Structure](#data)
- [Big O Notation](#big_o_notation)
- [Big Omega Notation](#big_omega_notation)
- [Big Theta Notation](#big_theta)
- [Selection Sort](#selection_sort)
- [Selection sort in python](#selection_sort_python)

<a name="introduction"></a>

## Algorithm

**Def**<sup>n</sup> **:**

step by step procedure,every procedure have many instructions,every instruction have many logical instruction and every instruction goes to output

<a name="characteristics"></a>

## Characteristics:

1. Deterministic
    * It is known , what is the goal of the algorithm
2. Termination
    * An algorithm must be terminated
3. input
4. output

<a name="analysis"></a>

## Need for Analysis of Algorithm

* Analysis of algorithm is the process of analyzing the problem sovling capabilities depends on time and space
    1. worst case
        - maximum number of steps
    2. Best case
        - minimum number of steps
    4. Average case
        - Average number of steps

<a name="strategies"></a>

## Design Strategies

* Many algorithm are recursive in nature to solve a given problem recursively to dealing with sub-problems
* In divide and conquer approach , a problem is divided into smaller problems,then the smaller problems are solved independently and finally smaller problems are combined into a solution for the large problem

  Generally divide and conquer algorithms have 3 parts
    1. Divde the problem into a number of sub-problems
    2. Conquer the sub-problems by solving them recursively
    3. Combine the solution to the sub-problem into the solution for the original problem
    

<a name="prosAndCons"></a>

## Pros and Cons of Divide and Conquer

* An algorithm which is designed using this technique, can run on the multiprocessor system or in different machines simultaneously
* In this approach, most of the algorithms are designed using recursion,hence memory management is very high
* For recursive function stack is used, where function state needs to be stored

<a name="divide"></a>

## Application of Divide and Conquer Approach

* Following are some problems, which are solved using divide and conquer approach
    - Finding the maximum and minimum of a sequence of numbers
    - Matrix Multiplication
    - Merge Sort
    - Binary Search

<a name="data"></a>

## Data Structure: 


A way to store , organise and manipulate data within a computer, in an efficient manner

#### Asymptotic Notation: 3 types:-

    1. Big oh - O()
    2. Big omega - Ω()
    3. Big theta - Θ()

<a name="big_o_notation"></a>

#### Big Oh Notation:

If ∃ (there exists or there is at least one) constants a,k > 0 such f(n) ≤ a * g(n) and ∀ n ≥ k, then f(n) = O(g(n))

- Upper bound on the order of growth of a function
    


#### Graphical Representation: 

<div class="fig figcenter fighighlight">
    <img src="/assets/big_o_notation.jpg">
</div>

#### Example:

f(n) = 20n<sup>3</sup> + 5n<sup>2</sup> + 3

g(n) = n<sup>3</sup>

Is it f(n) = O(g(n))?

#### Solution:

we know, If ∃ (there exists or there is at least one) constants a,k > 0 such f(n) ≤ a * g(n) and ∀ n ≥ k, then f(n) = O(g(n))
so, we get,

20n<sup>3</sup> + 5n<sup>2</sup> + 3 ≤ 20n<sup>3</sup> + 5n<sup>3</sup> + 3n<sup>3</sup>

or, 20n<sup>3</sup> + 5n<sup>2</sup> + 3 ≤ 28n<sup>3</sup>

so, a = 28 and b = 1 and all other conditions a * g(n) satisfied

<a name="big_omega_notation"></a> 

## Big Omega Notation

If ∃ (there exists or there is at least one) constants a,k > 0 such f(n) ≥ a * g(n) and ∀ n ≥ k, then f(n) = Ω(g(n))

#### Graphical View:

<div class="fig figcenter fighighlight">
    <img src="/assets/omega_notation.jpg">
</div>

<a name="big_theta"></a>

## Big Theta Notation

If ∃ (there exists or there is at least one) constants a<sub>1</sub>,a<sub>2</sub>,k > 0 such that a <sub>1</sub> x g(n) ≤f(n) ≤ a <sub>2</sub> x g(n) and ∀ n ≥ k, then f(n) = Θ(g(n))

#### Graphical View: 

<div class="fig figcenter fighighlight">
    <img src="/assets/theta_notation.jpg">
</div>

#### Example:

f(n) = n<sup>2 </sup> + 2
g(n) = n<sup>2 </sup>
Is that , f(n) = Θ(g(n))?

#### Solution:

If ∃ (there exists or there is at least one) constants a1,a2,k > 0 such that a 1 x g(n) ≤f(n) ≤ a 2 x g(n) and ∀ n ≥ k, then f(n) = Θ(g(n))

1 * n <sup> 2 </sup> ≤ n <sup>2</sup> + 2 ≤ 2 + n <sup>2</sup>

so, a<sub>1</sub> ,a<sub>2</sub> = 2 and b = 1

and all other condition satisfied 

so, we can say, f(n)= Θ(g(n))

<a name="selection_sort"></a>

#### Selection Sort

* In this technique, we find the smallest-element and place it in the appropirate position
* If we have n elements then it requires (n-1) pass to sort the elements
### Array

index   | 0 | 1 | 2 | 3 | 4
        --- | --- | --- | ---| --- | ---
elements  |3 | 7| 6 |2 | 1

    Here, we have 5 elements . so we need (5-1) = 4 pass to sort the array

**Pass1:**

In pass1 smallest element is searched between A[0] to A[4] and swapped with A[0]

index   | 0 | 1 | 2 | 3 | 4
        --- | --- | --- | ---| --- | ---
elements    |3 | 7| 6 |2 | 1

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

index | 0 | 1 | 2 | 3 | 4
        --- | --- | --- | ---| --- | ---
elements    |1 | 7| 6 |2 | 3

**Pass2:**

In pass 2 smallest element is searched between A[1] to A[4] and swapped with A[1] 

index   | 0 | 1 | 2 | 3 | 4
        --- | --- | --- | ---| --- | ---
Elements    |1 | 2| 6 |7 | 3

**Pass3:**

In pass 3 smallest element is searched between A[2] to A[4] and swapped with A[2]

index  | 0 | 1 | 2 | 3 | 4
        --- | --- | --- | ---| --- | ---
Elements    |1 | 2| 3 |7 |6 

**Pass4:**

In pass 4 smallest element is searched between A[3] to A[4] and swapped with A[3]

index   | 0 | 1 | 2 | 3 | 4
        --- | --- | --- | ---| --- | ---
elements |1|2|3|6|7

<a name="selection_sort_python"> </a>

#### Selection Sort in python

```python
# Array elements
A = [ 3,7,6,2,1]
# Traverse through all array elements
for i in range(len(A)):
    # let mimimum value of index
    minimum = i
    # find the minimum element in unsorted array
    for j in range(i+1,len(A)):
        if A[minimum] > A[j]:
            minimum = j
    # swap the minimum element with first elment
    A[i], A[minimum] = A[minimum], A[i]
#Print sorted array
print("Sorted Array:")
for i in range(len(A)):
    print("%d" %A[i]),
```

    Sorted Array:
    1
    2
    3
    6
    7

#### Selection Sort in C++

<a href="/courses/spring2018/code/#selection_sort"><strong>Selection Sort in c++</strong></a>

#### Insertion Sort in C++

<a href="/courses/spring2018/code/#insertion_sort"><strong>Insertion Sort in c++</strong></a>