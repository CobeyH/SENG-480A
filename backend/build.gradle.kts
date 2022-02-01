import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val http4k_version: String by project

plugins {
    kotlin("jvm") version "1.6.10"
    application
}

group = "io.github.carpool"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation(platform("org.http4k:http4k-bom:$http4k_version"))
    implementation("org.http4k:http4k-core")
    implementation("org.http4k:http4k-testing-hamkrest")
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

application {
    mainClass.set("MainKt")
}