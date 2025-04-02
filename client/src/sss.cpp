#include <bits/stdc++.h>
#include <numeric>
using namespace std;

// Sieve of Eratosthenes to find all prime numbers up to a limit
vector<bool> sieve_of_eratosthenes(int limit) {
    vector<bool> is_prime(limit + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= limit; ++p) {
        if (is_prime[p]) {
            for (int i = p * p; i <= limit; i += p) {
                is_prime[i] = false;
            }
        }
    }
    return is_prime;
}

// Precompute interesting ratios using efficient properties
vector<int> precompute_interesting_ratios(int max_n, const vector<bool>& is_prime) {
    vector<int> interesting_count(max_n + 1, 0);
    for (int a = 1; a <= max_n; ++a) {
        for (int b = a + 1; b <= max_n; ++b) {
            int gcd_ab = std::__gcd(a, b);
            long long lcm_ab = (1LL * a * b) / gcd_ab;
            int f_ab = lcm_ab / gcd_ab;
            if (f_ab <= 10000000 && is_prime[f_ab]) {
                interesting_count[b]++;
            }
        }
    }
    // Prefix sum to make the query O(1)
    for (int i = 1; i <= max_n; ++i) {
        interesting_count[i] += interesting_count[i - 1];
    }
    return interesting_count;
}

int main() {
    int t;
    cin >> t;
    vector<int> ns(t);
    for (int i = 0; i < t; ++i) {
        cin >> ns[i];
    }

    int max_n = *max_element(ns.begin(), ns.end());
    vector<bool> is_prime = sieve_of_eratosthenes(10000000);
    vector<int> interesting_count = precompute_interesting_ratios(max_n, is_prime);

    for (int n : ns) {
        cout << interesting_count[n] << endl;
    }

    return 0;
}
